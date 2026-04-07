import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTermekDto } from './dto/create-termek.dto';
import { UpdateTermekDto } from './dto/update-termek.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TermekService {
  constructor(private readonly db: PrismaService) {}

  async create(dto: CreateTermekDto) {
    try {
      const ujTermek = await this.db.termek.create({
        data: {
          KategoriaID: dto.kategoriaId,
          TermekNev: dto.termekNev,
          TermekAr: dto.termekAr,
          Keszlet: dto.keszlet,
          Brand: "Ismeretlen"
        },
      });

      return ujTermek
    } catch (error: any) {
      throw new ConflictException(
        'Ez a termék név már szerepel az adatbázisban.',
      );
    }

    throw new InternalServerErrorException(
      'Hiba történt az új termék felvételekor.'
    );
  }

  async findAll() {
    return await this.db.termek.findMany();
  }

  async findOne(id: number) {
    try {
      const termek = await this.db.termek.findUnique({
        where: {
          TermekID: id
        }
      });

      if (!termek) throw new NotFoundException(
        'A termék nem található!'
      );

      return termek;
    } catch (error: any) {
      throw new InternalServerErrorException(
        'Hiba történt a termék lekérdezésekor:', 
        error.message
      )
    }
  }

  update(id: number, updateTermekDto: UpdateTermekDto) {
    return `This action updates a #${id} termek`;
  }

  async remove(id: number) {
    try {
      return await this.db.termek.delete({
        where: { TermekID: id }
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          'A termék nem található!'
        )
      }
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'A termék nem törölhető!'
        )
      }
      throw new InternalServerErrorException(
        'Szerver hiba a termék törlésekor:',
        error.message
      )
    }
  }
}
