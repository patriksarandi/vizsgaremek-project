import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriaDto } from './dto/create-kategoria.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KategoriaService {
  constructor(private readonly db: PrismaService) {}

  async createKategoria(dto: CreateKategoriaDto) {
    try {
      return await this.db.kategoria.create({
        data: { Nev: dto.kategoriaNev },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ez a kategoria már szerepel az adatbázisban!');
      }
      throw new InternalServerErrorException('Hiba történt a kategoria felvétele során.');
    }
  }

  async findAllKategoria() {
    return await this.db.kategoria.findMany({
      where: { IsDeleted: false},
      orderBy: { Nev: 'asc' },
    });
  }

  async findKategoriaById(id: number) {
    const kategoria = await this.db.kategoria.findFirst({
      where: { KategoriaID: id, IsDeleted: false },
    });

    if (!kategoria) throw new NotFoundException('A kategória nem található!');
    return kategoria;
  }

  async removeKategoria(id: number) {
    const termekekSzama = await this.db.termek.count({
      where: { KategoriaID: id, IsDeleted: false}
    })

    if (termekekSzama > 0) {
      throw new BadRequestException('A kategória nem törölhető, mivel aktív termék(ek)-t tartalmaz.')
    }

    try {
      await this.db.kategoria.update({
        where: { KategoriaID: id },
        data: { IsDeleted: true}
      });
      return { message: 'A kategória sikeresen törölve!' };
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException('A kategória nem található!');
      throw new InternalServerErrorException('Hiba a törlés során!')
    }
  }
}
