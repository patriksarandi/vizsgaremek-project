import { Injectable } from '@nestjs/common';
import { CreateVevoDto } from './dto/create-vevo.dto';
import { UpdateVevoDto } from './dto/update-vevo.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VevoService {
  constructor(private readonly db: PrismaService) {}

  async create(dto: CreateVevoDto) {
    try {
      const ujVevo = await this.db.vevo.create({
        data: {
          VevoNev: dto.vevoNev,
          VevoEmail: dto.vevoEmail,
          VevoJelszo: dto.vevoJelszo,
          Role: dto.vevoRole,
          Cim: dto.cim,
          Keresztnev: dto.keresztnev,
          Vezeteknev: dto.vezeteknev,
          Telefonszam: dto.telefonszam,
        },
      });

      const { ...result } = ujVevo;
      return result;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('Ez az e-mail cím már regisztrálva van!');
      }
      throw new Error('Hiba történt a regisztráció során.');
    }
  }

  async findAll() {
    const vevok = await this.db.vevo.findMany();
    return vevok.map(({ ...vevo }) => vevo);
  }

  async findOne(id: number) {
    const vevo = await this.db.vevo.findUnique({
      where: { VevoID: id },
    });

    if (!vevo) throw new Error('A vevő nem található!');
    return vevo;
  }

  async findByEmail(email: string) {
    return await this.db.vevo.findUnique({
      where: {
        VevoEmail: email,
      },
    });
  }

  async updateNev(id: number, dto: UpdateVevoDto) {
    try {
      if (!dto.vezeteknev && !dto.keresztnev) {
        throw new Error('Legalább az egyik névmező megadása kötelező!');
      }

      const modositottVevo = await this.db.vevo.update({
        where: { VevoID: id },
        data: {
          Keresztnev: dto.keresztnev,
          Vezeteknev: dto.vezeteknev,
        },
      });

      return modositottVevo;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error(`Nem található vevő a megadott azonosítóval: ${id}`);
      }

      throw new Error('Hiba történt a név módosítása során.');
    }
  }

  async updateTelefonszam(id: number, dto: UpdateVevoDto) {
    try {
      if (!dto.telefonszam) {
        throw new Error('A telefonszám nincs kitöltve.');
      }

      const modositottVevo = await this.db.vevo.update({
        where: { VevoID: id },
        data: {
          Telefonszam: dto.telefonszam,
        },
      });

      return modositottVevo;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error(`Nem található vevő a megadott azonosítóval: ${id}`);
      }

      throw new Error('Hiba történt a telefonszám módosítása során.');
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

  async update(id: number, dto: UpdateVevoDto) {
    await this.findOne(id);

    try {
      const modositottVevo = await this.db.vevo.update({
        where: { VevoID: id },
        data: {
          VevoNev: dto.vevoNev,
          VevoEmail: dto.vevoEmail,
          VevoJelszo: dto.vevoJelszo,
          Cim: dto.cim,
        },
      });

      const { VevoJelszo, ...result } = modositottVevo;
      return result;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('Ez az e-mail cím már foglalt!');
      }
      throw new Error('Hiba történt a módosítás során.');
    }
  }

  async remove(id: number) {
    try {
      await this.db.vevo.delete({ where: { VevoID: id } });
      return { message: `A(z) ${id} azonosítójú vevő törölve.` };
    } catch (error: any) {
      if (error.code === 'P2025') throw new Error('Vevő nem található');
      if (error.code === 'P2003') {
        throw new Error('A vevőnek vannak rendelései, nem törölhető!');
      }
      throw new Error('Szerver hiba a törléskor.');
    }
  }
}
