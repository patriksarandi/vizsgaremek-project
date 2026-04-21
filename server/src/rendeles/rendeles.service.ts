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
      where: { VevoID: dto.VevoID },
      update: {},
      create: {
        KosarID: dto.VevoID,
        VevoID: dto.VevoID,
      },
    });

    return {
      ujFizetesiKosar,
      message: 'Új fizetési kosár sikeresen létrehozva a vevő azonosítójával: ',
    };
  }

  async findRendelesekByVevo(vevoId: number) {
  return await this.db.rendeles.findMany({
    where: { VevoID: vevoId },
    include: {
      RendeltTermek: {
        include: {
          Termek: true, 
        },
      },
    },
    orderBy: { RendelesiDatum: 'desc' },
  });
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
      return sum + Number(tetel.Termek.TermekAr) * tetel.TetelMennyiseg;
    }, 0);

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

  async createKosarTetel(dto: KosarTetelDto, vevoid: number) {
    const vevoId = Number(vevoid || dto.KosarID);

    const kosar = await this.db.fizetesiKosar.upsert({
      where: { VevoID: vevoId },
      update: {},
      create: { VevoID: vevoId },
    });

    const termek = await this.db.termek.findUnique({where: {TermekID: dto.TermekID}});
    const meglevoTetel = await this.db.kosarTetel.findUnique({
      where: { KosarID_TermekID: { KosarID: kosar.KosarID, TermekID: dto.TermekID}}
    });

    const jelenlegiMennyiseg = meglevoTetel ? meglevoTetel.TetelMennyiseg : 0;
    const ujMennyiseg = jelenlegiMennyiseg + Number(dto.TetelMennyiseg);

    if (termek.Keszlet < ujMennyiseg) {
      throw new BadRequestException('Nincs elég készleten a kért mennyiséghez!')
    }

    return await this.db.kosarTetel.upsert({
      where: {
        KosarID_TermekID: {
          KosarID: kosar.KosarID,
          TermekID: dto.TermekID,
        },
      },
      update: { TetelMennyiseg: { increment: Number(dto.TetelMennyiseg) },},
      create: {
        KosarID: kosar.KosarID,
        TermekID: dto.TermekID,
        TetelMennyiseg: Number(dto.TetelMennyiseg),
      },
    });
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
    const kosar = await this.db.fizetesiKosar.findUnique({
      where: { VevoID: vevoId },
    });

    if (!kosar) throw new NotFoundException('Nincs kosara a felhasználónak!');

    const meglevo = await this.db.kosarTetel.findUnique({
      where: {
        KosarID_TermekID: {
          KosarID: kosar.KosarID,
          TermekID: termekId,
        },
      },
      include: { Termek: true },
    });

    if (!meglevo) {
      throw new NotFoundException('Nincs ilyen tétel!');
    }

    const ujMennyiseg = meglevo.TetelMennyiseg + valtozas;

    if (ujMennyiseg <= 0) {
      return await this.db.kosarTetel.delete({
        where: { KosarTetelID: meglevo.KosarTetelID },
      });
    }

    if (valtozas > 0 && meglevo.Termek.Keszlet < ujMennyiseg) {
      throw new BadRequestException(
        `Nincs elég készleten! (Elérhető: ${meglevo.Termek.Keszlet})`,
      );
    }

    return await this.db.kosarTetel.update({
      where: { KosarTetelID: meglevo.KosarTetelID },
      data: { TetelMennyiseg: ujMennyiseg },
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
      for (const tetel of kosar.Tetelek) {
        if (tetel.Termek.Keszlet < tetel.TetelMennyiseg) {
          throw new BadRequestException(
            `Sajnos a(z) ${tetel.Termek.TermekNev} termékből nincs elég készleten (Elérhető: ${tetel.Termek.Keszlet})`,
          );
        }
      }

      const ujRendeles = await tx.rendeles.create({
        data: {
          VevoID: vevoId,
          RendelesiDatum: dto.RendelesiDatum || new Date(),
          Statusz: 'Aktív',
          RendelesiVegosszeg: 0,
        },
      });

      let osszeg = 0;
      for (const tetel of kosar.Tetelek) {
        const tetelAr = Number(tetel.Termek.TermekAr);
        osszeg += tetelAr * tetel.TetelMennyiseg;

        await tx.termek.update({
          where: { TermekID: tetel.TermekID },
          data: { Keszlet: { decrement: tetel.TetelMennyiseg } },
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
        data: { RendelesiVegosszeg: osszeg },
      });

      await tx.kosarTetel.deleteMany({ where: { KosarID: kosar.KosarID } });

      return {
        ...ujRendeles,
        success: true,
        message: 'Rendelés sikeresen leadva',
      };
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
