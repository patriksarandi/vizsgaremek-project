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
      return await this.db.termek.create({
        data: {
          KategoriaID: dto.KategoriaID,
          TermekNev: dto.TermekNev,
          TermekAr: dto.TermekAr,
          Keszlet: dto.Keszlet,
          Brand: dto.Brand || 'Ismeretlen',
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Ez a terméknév már szerepel az adatbázisban.',
        );
      }
      if (error.code === 'P2003') {
        throw new BadRequestException('A megadott kategória nem létezik.');
      }
      throw new InternalServerErrorException(
        'Hiba történt a termék létrehozásakor.',
      );
    }
  }

  async findAll(query: any) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const where: any = { IsDeleted: false };

    if (query.search) {
      const searchWords = query.search
        .split(' ')
        .filter((word) => word.length > 0);

      where.AND = searchWords.map((word) => ({
        OR: [
          { TermekNev: { contains: word } },
          { Brand: { contains: word } },
          {
            Kategoria: {
              Nev: { contains: word },
            },
          },
        ],
      }));
    }

    if (query.category) {
      const categoryList = String(query.category)
        .split(',')
        .map((id) => id.trim());

      const numericIds = categoryList
        .map((id) => Number(id))
        .filter((id) => !isNaN(id));

      if (numericIds.length > 0) {
        where.KategoriaID = { in: numericIds };
      } else {
        where.Kategoria = {
          Nev: { in: categoryList },
        };
      }
    }

    if (query.brand) {
      const brandList = String(query.brand).split(',');
      where.Brand = { in: brandList };
    }

    if (query.minPrice || query.maxPrice) {
      where.TermekAr = {};

      if (query.minPrice) {
        where.TermekAr.gte = Number(query.minPrice);
      }

      if (query.maxPrice) {
        where.TermekAr.lte = Number(query.maxPrice);
      }
    }

    //console.log('Beérkező query:', query);
    //console.log('Generált where objektum:', JSON.stringify(where, null, 2));

    return this.db.termek.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { TermekAr: 'asc' },
      include: {
        Kategoria: true,
        Ertekelesek: {
          select: {
            ErtekelesSzam: true,
          },
        },
      },
    });
  }

  async findAllBrands() {
    const brands = await this.db.termek.findMany({
      distinct: ['Brand'],
      select: {
        Brand: true,
      },
    });

    return brands.map((b) => b.Brand);
  }

  async findOne(id: number) {
    const termek = await this.db.termek.findFirst({
      where: { TermekID: id, IsDeleted: false },
      include: { Kategoria: true },
    });

    if (!termek) {
      throw new NotFoundException(
        `A(z) ${id} azonosítójú termék nem található!`,
      );
    }

    return termek;
  }

  async update(id: number, dto: UpdateTermekDto) {
    const letezo = await this.db.termek.findUnique({
      where: { TermekID: id },
    });

    if (!letezo) throw new NotFoundException('Nincs ilyen termék!');

    return await this.db.termek.update({
      where: { TermekID: id },
      data: {
        KategoriaID: dto.KategoriaID ? Number(dto.KategoriaID) : undefined,
        TermekNev: dto.TermekNev,
        TermekAr: dto.TermekAr,
        Keszlet: dto.Keszlet ? Number(dto.Keszlet) : undefined,
        Brand: dto.Brand,
      },
    });
  }

  async remove(id: number) {
    try {
      return await this.db.termek.delete({
        where: { TermekID: id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          'A termék nem található, így nem törölhető!',
        );
      }
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'A termék nem törölhető, mert már hivatkoznak rá (pl. rendelésekben/értékelésekben)!',
        );
      }
      throw new InternalServerErrorException('Hálózati hiba a törlés során.');
    }
  }
}
