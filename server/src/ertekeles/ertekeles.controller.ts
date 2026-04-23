import { Controller, Body, Patch, Req, Param, ParseIntPipe, Get, Delete } from '@nestjs/common';
import { ErtekelesService } from './ertekeles.service';
import { CreateErtekeleDto } from './dto/create-ertekele.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ertekeles')
@Controller('ertekeles')
export class ErtekelesController {
  constructor(private readonly ertekelesService: ErtekelesService) {}

  @Patch(':vevoId')
  @ApiOperation({ summary: 'Értékelés létrehozása vagy frissítése' })
  @ApiParam({ name: 'vevoId', description: 'A vevő egyedi azonosítója', example: 1 })
  @ApiResponse({ status: 200, description: 'Az értékelés sikeresen mentve.' })
  @ApiResponse({ status: 400, description: 'Hibás adatok a kérésben.' })
  updateErtekeles(
    @Param('vevoId', ParseIntPipe) vevoId: number,
    @Body() createErtekeleDto: CreateErtekeleDto, 
  ) {
    return this.ertekelesService.updateErtekeles(createErtekeleDto, vevoId);
  }

  @Get(':vevoId/osszes')
  @ApiOperation({ summary: 'Egy adott vevő összes értékelésének lekérése' })
  @ApiParam({ name: 'vevoId', description: 'A vevő azonosítója', example: 1 })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés.' })
  @ApiResponse({ status: 404, description: 'A vevő nem található vagy nincs értékelése.' })
  findAllByVevo(@Param('vevoId', ParseIntPipe) vevoId: number) {
    return this.ertekelesService.findAllErtekeles(vevoId);
  }

  @Delete(':termekId')
  @ApiOperation({ summary: 'Értékelés törlése egy adott termékről' })
  @ApiParam({ name: 'termekId', description: 'A termék azonosítója, amiről az értékelést töröljük', example: 101 })
  @ApiResponse({ status: 200, description: 'Az értékelés sikeresen törölve.' })
  @ApiResponse({ status: 401, description: 'Nincs érvényes token (bejelentkezés szükséges).' })
  removeErtekeles(@Param('termekId', ParseIntPipe) termekId: number, @Req() req: any) {
    return this.ertekelesService.removeErtekeles(req.user.VevoID, termekId)
  }
}
