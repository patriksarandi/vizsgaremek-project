import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVevoDto } from './dto/create-vevo.dto';
import { UpdateVevoDto } from './dto/update-vevo.dto';
import { PrismaService } from 'src/prisma.service';
import { Vevo } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VevoService {
  constructor(private readonly db: PrismaService) {}

  async findByEmail(email: string) {
    return await this.db.vevo.findUnique({
      where: {
        VevoEmail: email,
      },
    });
  }

  async create(dto: CreateVevoDto) {
    const hashedPassword = await bcrypt.hash(dto.vevoJelszo, 10);

    try {
      const ujVevo = await this.db.$transaction(async (tx) => {
        const vevo = await tx.vevo.create({
          data: {
            VevoNev: dto.vevoNev,
            VevoEmail: dto.vevoEmail,
            VevoJelszo: hashedPassword,
            Vezeteknev: dto.vezeteknev || '',
            Keresztnev: dto.keresztnev || '',
            Telefonszam: dto.telefonszam || '',
            Cim: dto.cim || '-',
            Role: dto.role || 'USER',
          },
        });

        await tx.fizetesiKosar.create({
          data: { VevoID: vevo.VevoID },
        });

        return vevo;
      });

      const { VevoJelszo, ...result } = ujVevo as Vevo;
      return result;
    } catch (error: any) {
      if (error.code === 'P2002')
        throw new ConflictException(
          'Ez az e-mail vagy felhasználónév már foglalt!',
        );
      throw new InternalServerErrorException(
        'Hiba történt a regisztráció során.',
      );
    }
  }

  async findOne(id: number) {
    const vevo = await this.db.vevo.findUnique({
      where: { VevoID: id },
    });
    if (!vevo) throw new NotFoundException(`A vevő (ID: ${id}) nem található`);
    const { VevoJelszo, ...result } = vevo;
    return result;
  }

  async update(id: number, dto: UpdateVevoDto, isAdmin: boolean = false) {
    const { vevoJelszo, role, ...rest } = dto;
    const updateData: any = { ...rest };

    if (role && isAdmin) updateData.Role = role;
    if (vevoJelszo) updateData.VevoJelszo = await bcrypt.hash(vevoJelszo, 10);

    try {
      const modositott = await this.db.vevo.update({
        where: { VevoID: id },
        data: updateData,
      });
      const { VevoJelszo, ...result } = modositott;
      return result;
    } catch (error: any) {
      if (error.code === 'P2002')
        throw new ConflictException('Foglalt adat (email/név).');
      throw new InternalServerErrorException('Sikertelen módosítás.');
    }
  }

  async remove(id: number) {
    try {
      return await this.db.vevo.delete({
        where: { VevoID: id },
      });
    } catch (error: any) {
      if (error.code === 'P2003')
        throw new BadRequestException(
          'A felhasználó nem törölhető, mert rendelések vagy értékelések kapcsolódnak hozzá!',
        );
      if (error.code === 'P2025')
        throw new NotFoundException('A keresett felhasználó nem létezik.');

      throw new InternalServerErrorException(
        'Váratlan hiba történt a törlés során.',
      );
    }
  }

  async updateNev(id: number, dto: UpdateVevoDto) {
    return await this.db.vevo.update({
      where: { VevoID: id },
      data: {
        Keresztnev: dto.keresztnev,
        Vezeteknev: dto.vezeteknev,
      },
    });
  }

  async updateTelefonszam(id: number, dto: UpdateVevoDto) {
    if (!dto.telefonszam)
      throw new BadRequestException('A telefon megadása kötelező.');

    try {
      return await this.db.vevo.update({
        where: { VevoID: id },
        data: { Telefonszam: dto.telefonszam },
      });
    } catch (error: any) {
      if (error.code === 'P2025')
        throw new NotFoundException(
          `Nem található ilyen vevő a megadott azonosítóval: ${id}`,
        );

      throw new InternalServerErrorException(
        'Hiba történt a telefonszám módosítása során.',
      );
    }
  }

  async updateEmail(id: number, dto: UpdateVevoDto) {
    try {
      if (!dto.vevoEmail) {
        throw new Error('Az email nincs kitöltve.');
      }

      const modositottVevo = await this.db.vevo.update({
        where: { VevoID: id },
        data: {
          VevoEmail: dto.vevoEmail,
        },
      });

      return modositottVevo;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error(`Nem található vevő a megadott azonosítóval: ${id}`);
      }

      throw new Error('Hiba történt az email módosítása során.');
    }
  }

  async updateSzallitasiCim(id: number, dto: UpdateVevoDto) {
    await this.findOne(id);

    return await this.db.vevo.update({
      where: { VevoID: id },
      data: { Cim: dto.cim },
    });
  }
}
