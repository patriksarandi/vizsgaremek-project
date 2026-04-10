import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
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
      throw new BadRequestException('A VevoID megadása kötelező');
    }

    const ujFizetesiKosar =
      this.rendelesService.createFizetesiKosar(fizetesiKosarDto);

    return {
      ujFizetesiKosar,
      message: 'A fizetési kosár sikeresen létrehozva',
    };
  }

  @Get('/kosar')
  findAllFizetesiKosar() {
    return this.rendelesService.findAllFizetesiKosar();
  }

  @Post('/kosartetel')
  async createKosarTetel(@Body() dto: KosarTetelDto) {
    try {
      return await this.rendelesService.createKosarTetel(dto, dto.vevoId);
    } catch (error: any) {
      throw new BadRequestException('Nem sikerült a tétel a kosárhoz adni.');
    }
  }

  @Get('/kosartetel/:vevoId')
  async findKosarTetelByVevoId(@Param('vevoId', ParseIntPipe) vevoId: number) {
    return this.rendelesService.findKosarTetelByVevoId(vevoId);
  }

  @Get('/kosartetel')
  findAllKosarTetel() {
    return this.rendelesService.findAllKosarTetel();
  }

  @Delete('/kosartetel/:id')
  removeKosarTetel(@Param('id') id: number) {
    return this.rendelesService.removeKosarTetel(+id);
  }

  @Post()
  create(@Body() createRendeleDto: CreateRendelesDto) {
    return this.rendelesService.create(createRendeleDto);
  }

  @Delete('/kosar/:vevoId')
  async removeKosar(@Param('vevoId', ParseIntPipe) vevoId: number) {
    return this.rendelesService.removeKosar(vevoId);
  }

  @Patch('kosartetel/update')
  async updateKosarTetel(
    @Body('vevoId') vevoId: number,
    @Body('termekId') termekId: number,
    @Body('valtozas') valtozas: number,
  ) {
    
    console.log('Beérkező adatok:', { vevoId, termekId, valtozas });

    if (
      vevoId === undefined ||
      termekId === undefined ||
      valtozas === undefined
    ) {
      throw new BadRequestException(
        'Hiányzó adatok! Ellenőrizd a mezőneveket.',
      );
    }

    return await this.rendelesService.updateKosarTetelMennyiseg(
      Number(vevoId),
      Number(termekId),
      Number(valtozas),
    );
  }
}
