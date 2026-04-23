import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TermekService } from './termek.service';
import { CreateTermekDto } from './dto/create-termek.dto';
import { UpdateTermekDto } from './dto/update-termek.dto';
import { ApiTags, ApiParam, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('termek')
@Controller('termek')
export class TermekController {
  constructor(private readonly termekService: TermekService) {}

  @ApiOperation({ summary: 'Új termék létrehozása (Admin) '})
  @ApiResponse({ status: 201, description: 'A termék sikeresen létrejött.' })
  @ApiResponse({ status: 400, description: 'Hibás beviteli adatok.' })
  @Post()
  create(@Body() createTermekDto: CreateTermekDto) {
    return this.termekService.create(createTermekDto);
  }

  @Get('brands')
  @ApiOperation({ summary: 'Az összes elérhető márka listázása' })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés.' })
  findAllBrands() {
    return this.termekService.findAllBrands();
  }

  @Get()
  @ApiOperation({ summary: 'Termékek listázása szűrési feltételekkel' })
  @ApiQuery({ name: 'search', required: false, description: 'Keresés név alapján' })
  @ApiQuery({ name: 'kategoriaId', required: false, description: 'Szűrés kategóriára' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum ár' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum ár' })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés.' })
  async findAll(@Req() req: any) {
    const vevoId = req.user?.id;
    
    return this.termekService.findAll({
      ...req.query,
      vevoId: vevoId ? Number(vevoId) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy termék részletes adatainak lekérése' })
  @ApiParam({ name: 'id', description: 'A termék egyedi azonosítója', example: 1 })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés.' })
  @ApiResponse({ status: 404, description: 'A termék nem található.' })
  findOne(@Param('id') id: string) {
    return this.termekService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Termék adatainak frissítése' })
  @ApiParam({ name: 'id', description: 'A frissítendő termék azonosítója' })
  @ApiResponse({ status: 200, description: 'A termék sikeresen frissítve.' })
  @ApiResponse({ status: 404, description: 'A termék nem található.' })
  update(@Param('id') id: string, @Body() updateTermekDto: UpdateTermekDto) {
    return this.termekService.update(+id, updateTermekDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Termék végleges törlése' })
  @ApiParam({ name: 'id', description: 'A törlendő termék azonosítója' })
  @ApiResponse({ status: 200, description: 'A termék sikeresen törölve.' })
  @ApiResponse({ status: 404, description: 'A termék nem található.' })
  remove(@Param('id') id: string) {
    return this.termekService.remove(+id);
  }
}
