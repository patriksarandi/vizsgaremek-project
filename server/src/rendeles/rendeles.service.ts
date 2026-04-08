import { Injectable, NotFoundException } from '@nestjs/common';
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
      create: { VevoID: dto.vevoId },
    });

    return ujFizetesiKosar;
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

  async createKosarTetel(dto: KosarTetelDto) {
    const termek = await this.db.termek.findUnique({
      where: { TermekID: dto.termekId },
    });

    if (!termek) {
      throw new NotFoundException('Ilyen termék nem létezik');
    }

    const ujKosarTetel = await this.db.kosarTetel.create({
      data: {
        KosarID: dto.kosarId,
        TermekID: dto.termekId,
        TetelMennyiseg: dto.tetelMennyiseg,
      },
    });

    console.log(ujKosarTetel);

    return ujKosarTetel
      ? { message: 'Sikeresen létrehozott kosártétel' }
      : { message: 'Nem sikerült.' };
  }

  findAllKosarTetel() {
    return this.db.kosarTetel.findMany({
      include: {
        Termek: true,
        Kosar: true
      }
    })
  }

  create(createRendelesDto: CreateRendelesDto) {
    return 'This action adds a new rendele';
  }

  findAll() {
    return `This action returns all rendeles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rendele`;
  }

  update(id: number, dto: CreateRendelesDto) {
    return `This action updates a #${id} rendele`;
  }

  remove(id: number) {
    return `This action removes a #${id} rendele`;
  }
}
