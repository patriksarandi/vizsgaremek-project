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
  UseGuards,
} from '@nestjs/common';
import { RendelesService } from './rendeles.service';
import { KosarTetelDto } from './dto/create-rendeles.dto';
import { FizetesiKosarDto } from './dto/create-rendeles.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('rendeles')
export class RendelesController {
  constructor(private readonly rendelesService: RendelesService) {}

  @Post('/kosar')
  createFizetesiKosar(@Body() fizetesiKosarDto: FizetesiKosarDto) {
    const vevoId = fizetesiKosarDto.VevoID;

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

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  async findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.rendelesService.findRendelesekByVevo(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/kosartetel')
  async createKosarTetel(@Body() dto: KosarTetelDto) {
    try {
      return await this.rendelesService.createKosarTetel(dto, dto.VevoID);
    } catch (error: any) {
      throw new BadRequestException(
        'Nem sikerült a tétel a kosárhoz adni.',
        error.message,
      );
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
  async createRendeles(@Body() body: any) {
    const vevoId = Number(body.vevoId || body.VevoID);
    return this.rendelesService.createRendeles(vevoId, body);
  }

  @Get('admin')
  findAll() {
    return this.rendelesService.findAllAdmin();
  }

  @Get('admin')
  async findAllAdmin() {
    return await this.rendelesService.findAllAdmin();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('Statusz') statusz: string) {
    return this.rendelesService.updateStatus(+id, statusz);
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body('Statusz') statusz: string,
  ) {
    return await this.rendelesService.updateStatus(+id, statusz);
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
