import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateKategoriaDto } from './dto/create-kategoria.dto';
import { UpdateKategoriaDto } from './dto/update-kategoria.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KategoriaService {
  constructor (private readonly db: PrismaService) {}

  async create(dto: CreateKategoriaDto) {
    try {
      const ujKategoria = await this.db.kategoria.create({
        data: {
          Nev: dto.kategoriaNev
        },
      })
      return ujKategoria;
    } catch (error:any) {
      if (error.code === 'P2002') {
        throw new Error('Ez a kategoria már szerepel az adatbázisban!')
      }
      throw new Error(
        'Hiba történt a kategoria felvétele során.'
      )
    }
  }

  async findAll() {
    return await this.db.kategoria.findMany();
  }

  async findOne(id: number) {
    const kategoria = await this.db.kategoria.findUnique({
      where: { KategoriaID: id }
    })

    if (!kategoria) throw new Error('A kategória nem található!');
    return kategoria;
  }
  
  async remove(id: number) {
    try {
      await this.db.kategoria.delete({
        where: { KategoriaID: id}
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('A kategória nem található!')
      }
      if (error.code === 'P2003') {
        throw new Error(
          'A kategória nem törölhető!'
        )
      }
      throw new Error('Szerver hiba a törléskor.');
    }
  }
}
