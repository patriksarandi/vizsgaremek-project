import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { KategoriaService } from './kategoria.service';
import { CreateKategoriaDto } from './dto/create-kategoria.dto';
import { UpdateKategoriaDto } from './dto/update-kategoria.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('kategoria')
@Controller('kategoria')
export class KategoriaController {
  constructor(private readonly kategoriaService: KategoriaService) {}

  @Post()
  @ApiOperation({ summary: 'Új kategória létrehozása' })
  @ApiResponse({ status: 201, description: 'A kategória sikeresen létrejött.' })
  @ApiResponse({ status: 400, description: 'Érvénytelen adatok.' })
  create(@Body() createKategoriaDto: CreateKategoriaDto) {
    return this.kategoriaService.createKategoria(createKategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Az összes kategória listázása' })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés.' })
  findAll() {
    return this.kategoriaService.findAllKategoria();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Létező kategória frissítése' })
  @ApiParam({ name: 'id', description: 'A frissítendő kategória azonosítója', example: '1' })
  @ApiResponse({ status: 200, description: 'A kategória sikeresen frissítve.' })
  @ApiResponse({ status: 404, description: 'A kategória nem található.' })
  update(@Param('id') id: string, @Body() updateDto: UpdateKategoriaDto) {
    return this.kategoriaService.updateKategoria(+id, updateDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy kategória lekérése azonosító alapján' })
  @ApiParam({ name: 'id', description: 'A kategória egyedi azonosítója', example: '1' })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés.' })
  @ApiResponse({ status: 404, description: 'A kategória nem található.' })
  findOne(@Param('id') id: string) {
    return this.kategoriaService.findKategoriaById(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kategória törlése' })
  @ApiParam({ name: 'id', description: 'A törlendő kategória azonosítója', example: '1' })
  @ApiResponse({ status: 200, description: 'A kategória sikeresen törölve.' })
  @ApiResponse({ status: 404, description: 'A kategória nem található.' })
  remove(@Param('id') id: string) {
    return this.kategoriaService.removeKategoria(+id);
  }
}
