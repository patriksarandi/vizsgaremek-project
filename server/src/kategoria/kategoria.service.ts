import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriaDto } from './dto/create-kategoria.dto';
import { UpdateKategoriaDto } from './dto/update-kategoria.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KategoriaService {
  constructor(private readonly db: PrismaService) {}

  async create(dto: CreateKategoriaDto) {
    try {
      return await this.db.kategoria.create({
        data: {
          Nev: dto.kategoriaNev,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('Ez a kategoria már szerepel az adatbázisban!');
      }
      throw new Error('Hiba történt a kategoria felvétele során.');
    }
  }

  async findAll() {
    return await this.db.kategoria.findMany({
      orderBy: { Nev: 'asc' },
    });
  }

  async findOne(id: number) {
    const kategoria = await this.db.kategoria.findUnique({
      where: { KategoriaID: id },
    });

    if (!kategoria) throw new Error('A kategória nem található!');
    return kategoria;
  }

  async remove(id: number) {
    try {
      await this.db.kategoria.delete({
        where: { KategoriaID: id },
      });
      return { message: 'Sikeres törlés' };
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('A kategória nem található!');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'A kategória nem törölhető, mert termékek tartoznak hozzá!',
        );
      }
      throw new InternalServerErrorException('Szerver hiba a törléskor.');
    }
  }
}
