import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KategoriaService } from './kategoria.service';
import { CreateKategoriaDto } from './dto/create-kategoria.dto';
import { UpdateKategoriaDto } from './dto/update-kategoria.dto';

@Controller('kategoria')
export class KategoriaController {
  constructor(private readonly kategoriaService: KategoriaService) {}

  @Post()
  create(@Body() createKategoriaDto: CreateKategoriaDto) {
    return this.kategoriaService.create(createKategoriaDto);
  }

  @Get()
  findAll() {
    return this.kategoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kategoriaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kategoriaService.remove(+id);
  }
}
