import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { KategoriaService } from './kategoria.service';
import { CreateKategoriaDto } from './dto/create-kategoria.dto';
import { UpdateKategoriaDto } from './dto/update-kategoria.dto';

@Controller('kategoria')
export class KategoriaController {
  constructor(private readonly kategoriaService: KategoriaService) {}

  @Post()
  create(@Body() createKategoriaDto: CreateKategoriaDto) {
    return this.kategoriaService.createKategoria(createKategoriaDto);
  }

  @Get()
  findAll() {
    return this.kategoriaService.findAllKategoria();
  }

  @Put(':id') 
  update(@Param('id') id: string, @Body() updateDto: UpdateKategoriaDto) {
    return this.kategoriaService.updateKategoria(+id, updateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kategoriaService.findKategoriaById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kategoriaService.removeKategoria(+id);
  }
}
