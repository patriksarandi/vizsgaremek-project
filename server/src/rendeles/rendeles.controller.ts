import { Controller, Get, Post, Body, Param, Delete, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { RendelesService } from './rendeles.service';
import { CreateRendelesDto, KosarTetelDto } from './dto/create-rendeles.dto';
import { FizetesiKosarDto } from './dto/create-rendeles.dto';

@Controller('rendeles')
export class RendelesController {
  constructor(private readonly rendelesService: RendelesService) {}

  @Post('/kosar')
  createFizetesiKosar(@Body() fizetesiKosarDto: FizetesiKosarDto) {
    const vevoId = fizetesiKosarDto.vevoId;

    if (!vevoId) {
      throw new BadRequestException('A VevoID megadása kötelező')
    }

    const ujFizetesiKosar = this.rendelesService.createFizetesiKosar(fizetesiKosarDto)

    return {
      ujFizetesiKosar, 
      message: "A fizetési kosár sikeresen létrehozva"
    }
  }

  @Get('/kosar')
  findAllFizetesiKosar() {
    return this.rendelesService.findAllFizetesiKosar();
  }

  @Post('/kosartetel')
  async createKosarTetel(
    @Body() dto: KosarTetelDto) {
      try {
        return await this.rendelesService.createKosarTetel(dto, dto.vevoId);
      } catch (error: any) {
        throw new BadRequestException('Nem sikerült a tétel a kosárhoz adni.')
      }
  }

  @Get('/kosartetel')
  findAllKosarTetel() {
    return this.rendelesService.findAllKosarTetel();
  }

  @Delete('/kosartetel/:id')
  removeKosarTetel(@Param('id') id: number) {
    return this.rendelesService.removeKosarTetel(+id)
  }

  @Post()
  create(@Body() createRendeleDto: CreateRendelesDto) {
    return this.rendelesService.create(createRendeleDto);
  }

  @Delete('/kosar/:vevoId')
  remove(@Param('vevoId') vevoId: string) {
    return this.rendelesService.removeKosar(+vevoId);
  }
}
