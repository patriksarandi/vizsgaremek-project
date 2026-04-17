import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateErtekeleDto } from './dto/create-ertekele.dto';
import { UpdateErtekeleDto } from './dto/update-ertekele.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ErtekelesService {
  constructor (private readonly db: PrismaService) {}

  async updateErtekeles(dto: CreateErtekeleDto, vevoId: number) {
    const vevo = await this.db.vevo.findUnique({
      where: {VevoID: vevoId}
    })

    if (!vevo) {
      throw new NotFoundException('A felhasználó nem található.')
    }

    return await this.db.ertekeles.upsert({
      where: {
        VevoID_TermekID: {
          VevoID: vevoId,
          TermekID: dto.TermekID,
        },
      },
      update: {
        ErtekelesSzam: dto.ErtekelesSzam,
      },
      create: {
        VevoID: vevoId,
        TermekID: dto.TermekID,
        ErtekelesSzam: dto.ErtekelesSzam
      }
    })
  }

  async findAllErtekeles() {
    return this.db.ertekeles.findMany({
      include: {
        Termek: true,
        Vevo: true
      }
    })
  }

  async removeErtekeles(vevoId: number, termekId: number) {
    try {
      return await this.db.ertekeles.delete({
        where: {
          VevoID_TermekID: {
            VevoID: vevoId,
            TermekID: termekId
          }
        }
      })
    } catch (error: any) {
      throw new NotFoundException('Az értékelés nem található!')
    }
  }
}
