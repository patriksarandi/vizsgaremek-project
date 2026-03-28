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
          Cim: dto.cim,
        },
      });

      const { VevoJelszo, ...result } = ujVevo;
      return result;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ez az e-mail cím már regisztrálva van!');
      }
      throw new InternalServerErrorException(
        'Hiba történt a regisztráció során.',
      );
    }
  }

  async findAll() {
    const vevok = await this.db.vevo.findMany();
    return vevok.map(({ VevoJelszo, ...vevo }) => vevo);
  }

  async findOne(id: number) {
    const vevo = await this.db.vevo.findUnique({
      where: { VevoID: id },
    });

    if (!vevo) throw new NotFoundException('A vevő nem található!');
    return vevo;
  }

  async findByEmail(email: string) {
    return await this.db.vevo.findUnique({
      where: {
        VevoEmail: email
      },
    });
  }

  async findByEmailOrName(email: string, name: string) {
    return await this.db.vevo.findFirst({
      where: {
        OR: [
          { VevoEmail: email },
          { VevoNev: name }
        ]
      }
    });
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
        throw new ConflictException('Ez az e-mail cím már foglalt!');
      }
      throw new InternalServerErrorException('Hiba történt a módosítás során.');
    }
  }

  async remove(id: number) {
    try {
      await this.db.vevo.delete({ where: { VevoID: id } });
      return { message: `A(z) ${id} azonosítójú vevő törölve.` };
    } catch (error: any) {
      if (error.code === 'P2025')
        throw new NotFoundException('Vevő nem található');
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'A vevőnek vannak rendelései, nem törölhető!',
        );
      }
      throw new InternalServerErrorException('Szerver hiba a törléskor.');
    }
  }
}
