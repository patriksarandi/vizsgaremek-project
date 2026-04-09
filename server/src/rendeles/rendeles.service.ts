import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRendelesDto } from './dto/create-rendeles.dto';
import { FizetesiKosarDto, KosarTetelDto } from './dto/create-rendeles.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RendelesService {
  constructor(private readonly db: PrismaService) {}

  async createFizetesiKosar(dto: FizetesiKosarDto) {
    const ujFizetesiKosar = await this.db.fizetesiKosar.upsert({
      where: { VevoID: dto.vevoId },
      update: {},
      create: {
        KosarID: dto.vevoId,
        VevoID: dto.vevoId
      },
    });

    return {
      ujFizetesiKosar,
      message: 'Új fizetési kosár sikeresen létrehozva a vevő azonosítójával: ',
    };
  }

  async findKosarTetelByVevoId(vevoId: number) {
    const kosar = await this.db.fizetesiKosar.findUnique({
      where: {
        VevoID: vevoId,
      },
      include: {
        Tetelek: {
          include: {
            Termek: true,
          },
        },
      },
    });

    if (!kosar) return { message: 'A kosár nem található!' };

    return {
      ...kosar,
      Tetelek: kosar.Tetelek.map((tetel) => ({
        ...tetel,
        Termek: {
          ...tetel.Termek,
          TermekAr: Number(tetel.Termek.TermekAr),
        },
      })),
    };
  }

  async findAllFizetesiKosar() {
    return await this.db.fizetesiKosar.findMany({
      include: {
        Tetelek: {
          include: {
            Termek: true,
          },
        },
        Vevo: true,
      },
    });
  }

  async createKosarTetel(dto: KosarTetelDto, vevoId: number) {
    const termek = await this.db.termek.findUnique({
      where: { TermekID: dto.termekId },
    });

    if (!termek) {
      throw new NotFoundException('Ilyen termék nem létezik');
    }

    const meglevo = await this.db.kosarTetel.findUnique({
      where: {
        KosarID_TermekID: {
          KosarID: dto.kosarId,
          TermekID: dto.termekId,
        },
      },
    });

    const ujOsszMennyiseg = (meglevo?.TetelMennyiseg || 0) + dto.tetelMennyiseg;

    if (termek.Keszlet < ujOsszMennyiseg) {
      throw new BadRequestException(
        `Nincs elég a készleten. Elérhető: ${termek.Keszlet}`,
      );
    }

    const ujKosarTetel = await this.db.kosarTetel.upsert({
      where: {
        KosarID_TermekID: {
          KosarID: dto.kosarId,
          TermekID: dto.termekId,
        },
      },
      update: {
        TetelMennyiseg: {
          increment: dto.tetelMennyiseg,
        },
      },
      create: {
        KosarID: dto.kosarId,
        TermekID: dto.termekId,
        TetelMennyiseg: dto.tetelMennyiseg,
      },
    });

    console.log(ujKosarTetel);

    return {
      message: 'Sikeresen létrehozott kosártétel.',
      adat: ujKosarTetel,
    };
  }

  async getTermekKeszletMennyiseg(termekId: number) {
    const result = await this.db.termek.findUnique({
      where: { TermekID: termekId },
      select: { Keszlet: true },
    });

    if (!result) {
      throw new NotFoundException('Termék nem található!');
    }

    return result.Keszlet;
  }

  findAllKosarTetel() {
    return this.db.kosarTetel.findMany({
      include: {
        Termek: true,
        Kosar: true,
      },
    });
  }

  removeKosarTetel(id: number) {
    return this.db.kosarTetel.delete({
      where: { KosarTetelID: id },
    });
  }

  create(createRendelesDto: CreateRendelesDto) {
    return 'This action adds a new rendele';
  }

  async removeKosar(vevoId: number) {
    try {
      await this.db.fizetesiKosar.delete({
        where: { VevoID: vevoId },
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
