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
        VevoID: dto.vevoId,
      },
    });

    return {
      ujFizetesiKosar,
      message: 'Új fizetési kosár sikeresen létrehozva a vevő azonosítójával: ',
    };
  }

  async findKosarByVevo(vevoId: number) {
    return await this.db.kosarTetel.findMany({
      where: {
        KosarID: vevoId,
      },
      include: {
        Termek: true,
      },
    });
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

    const vegosszeg = kosar.Tetelek.reduce((sum, tetel) => {
      return sum + (Number(tetel.Termek.TermekAr) * tetel.TetelMennyiseg);
    }, 0)

    return {
      ...kosar,
      Vegosszeg: vegosszeg,
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

  async updateKosarTetelMennyiseg(
    vevoId: number,
    termekId: number,
    valtozas: number,
  ) {
    const meglevo = await this.db.kosarTetel.findFirst({
      where: {
        KosarID: vevoId,
        TermekID: termekId,
      },
    });

    if (!meglevo) {
      throw new NotFoundException('Nincs ilyen tétel!');
    }

    const ujMennyiseg = meglevo.TetelMennyiseg + valtozas;

    if (ujMennyiseg <= 0) {
      return await this.db.kosarTetel.delete({
        where: {
          KosarID_TermekID: {
            KosarID: vevoId,
            TermekID: termekId,
          },
        },
      });
    }

    if (valtozas > 0) {
      const termek = await this.db.termek.findUnique({
        where: { TermekID: termekId },
      });

      if (termek && termek.Keszlet < ujMennyiseg) {
        throw new BadRequestException(
          `Nincs elég készleten. Elérhető: ${termek.Keszlet}`,
        );
      }
    }

    return await this.db.kosarTetel.update({
      where: {
        KosarTetelID: meglevo.KosarTetelID,
      },
      data: {
        TetelMennyiseg: {
          increment: valtozas,
        },
      },
    });
  }

  async createRendeles(vevoId: number, dto: CreateRendelesDto) {
    const kosar = await this.db.fizetesiKosar.findUnique({
      where: { VevoID: vevoId },
      include: { Tetelek: { include: { Termek: true } } },
    });

    if (!kosar || kosar.Tetelek.length === 0) {
      throw new BadRequestException('A kosár üres!');
    }

    return await this.db.$transaction(async (tx) => {
      const ujRendeles = await tx.rendeles.create({
        data: {
          VevoID: vevoId,
          RendelesiDatum: dto.rendelesiDatum || new Date(),
          Statusz: 'Aktív',
          RendelesiVegosszeg: 0,
        },
      });

      let osszeg = 0;
      for (const tetel of kosar.Tetelek) {
        const tetelAr = Number(tetel.Termek.TermekAr);
        osszeg += tetelAr * tetel.TetelMennyiseg;

        if (tetel.Termek.Keszlet < tetel.TetelMennyiseg) {
          throw new BadRequestException(`Nincs elég készlet: ${tetel.Termek.TermekNev}`);
        }

        await tx.termek.update({
          where: { TermekID: tetel.TermekID},
          data: { Keszlet: { decrement: tetel.TetelMennyiseg }}
        });

        await tx.rendeltTermek.create({
          data: {
            RendelesID: ujRendeles.RendelesID,
            TermekID: tetel.TermekID,
            RendeltMennyiseg: tetel.TetelMennyiseg,
            RendeltEgysegar: tetel.Termek.TermekAr,
          },
        });
      }

      await tx.rendeles.update({
        where: { RendelesID: ujRendeles.RendelesID },
        data: { RendelesiVegosszeg: osszeg }
      })

      await tx.kosarTetel.deleteMany({
        where: { KosarID: vevoId }
      });

      return {
        ...ujRendeles,
        success: true,
        RendelesiVegosszeg: osszeg,
        message: "Rendelés sikeresen leadva"
      }
    });
  }

  async removeKosarTetel(id: number) {
    const letezik = await this.db.kosarTetel.findUnique({
      where: { KosarTetelID: id },
    });
    if (!letezik) throw new NotFoundException('A tétel nem található');

    return await this.db.kosarTetel.delete({
      where: { KosarTetelID: id },
    });
  }

  async removeKosar(vevoId: number) {
    await this.db.kosarTetel.deleteMany({
      where: { KosarID: vevoId },
    });

    return await this.db.fizetesiKosar.delete({
      where: { VevoID: vevoId },
    });
  }
}
