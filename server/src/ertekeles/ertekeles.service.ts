import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateErtekeleDto } from './dto/create-ertekele.dto';
import { UpdateErtekeleDto } from './dto/update-ertekele.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ErtekelesService {
  constructor(private readonly db: PrismaService) {}

  async updateErtekeles(dto: CreateErtekeleDto, vevoId: number) {
    const [vevo, termek] = await Promise.all([
      this.db.vevo.findUnique({ where: { VevoID: vevoId } }),
      this.db.termek.findUnique({ where: { TermekID: dto.TermekID } }),
    ]);

    if (!vevo) throw new NotFoundException('A felhasználó nem található.');
    if (!termek) throw new NotFoundException('A termék nem található!')

    return await this.db.ertekeles.upsert({
      where: {
        VevoID_TermekID: {
          VevoID: vevoId,
          TermekID: dto.TermekID,
        },
      },
      update: {
        ErtekelesSzam: Number(dto.ErtekelesSzam),
      },
      create: {
        VevoID: vevoId,
        TermekID: dto.TermekID,
        ErtekelesSzam: Number(dto.ErtekelesSzam),
      },
    });
  }

  async findAllErtekeles(vevoId: number) {
    const ertekelesek = this.db.ertekeles.findMany({
      where: {
        VevoID: vevoId,
      },
      include: {
        Termek: true,
      },
    });
    return ertekelesek;
  }

  async removeErtekeles(vevoId: number, termekId: number) {
    try {
      return await this.db.ertekeles.delete({
        where: {
          VevoID_TermekID: {
            VevoID: vevoId,
            TermekID: termekId,
          },
        },
      });
    } catch (error: any) {
      throw new NotFoundException('Az értékelés nem található!');
    }
  }
}
