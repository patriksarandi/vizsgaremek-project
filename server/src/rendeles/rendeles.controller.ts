import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { RendelesService } from './rendeles.service';
import { CreateRendelesDto, KosarTetelDto } from './dto/create-rendeles.dto';
import { UpdateRendeleDto } from './dto/update-rendeles.dto';
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

    return {ujFizetesiKosar, message: "A fizetési kosár sikeresen létrehozva"}
  }

  @Get('/kosar')
  findAllFizetesiKosar() {
    return this.rendelesService.findAllFizetesiKosar();
  }

  @Post('/kosartetel')
  createKosarTetel(
    @Body() dto: KosarTetelDto) {
      return this.rendelesService.createKosarTetel(dto);
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

  @Get()
  findAll() {
    return this.rendelesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rendelesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rendelesService.remove(+id);
  }
}
