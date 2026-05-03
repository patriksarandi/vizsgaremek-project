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
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rendeles')
@Controller('rendeles')
export class RendelesController {
  constructor(private readonly rendelesService: RendelesService) {}

  @Post('/kosar')
  @ApiOperation({ summary: 'Fizetési kosár létrehozása egy vevőhöz' })
  @ApiResponse({ status: 201, description: 'A kosár sikeresen létrejött.' })
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
  @ApiOperation({ summary: 'Az összes fizetési kosár lekérése' })
  findAllFizetesiKosar() {
    return this.rendelesService.findAllFizetesiKosar();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  @ApiOperation({ summary: 'Egy adott felhasználó összes rendelésének lekérése' })
  @ApiParam({ name: 'id', description: 'A felhasználó (vevő) azonosítója', example: 1 })
  async findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.rendelesService.findRendelesekByVevo(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/kosartetel')
  @ApiOperation({ summary: 'Új tétel hozzáadása a kosárhoz' })
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
  @ApiOperation({ summary: 'Egy adott vevő kosarában lévő tételek lekérése' })
  @ApiParam({ name: 'vevoId', description: 'Vevő azonosító', example: 1 })
  async findKosarTetelByVevoId(@Param('vevoId', ParseIntPipe) vevoId: number) {
    return this.rendelesService.findKosarTetelByVevoId(vevoId);
  }

  @Get('/kosartetel')
  findAllKosarTetel() {
    return this.rendelesService.findAllKosarTetel();
  }

  @Delete('/kosartetel/:id')
  @ApiOperation({ summary: 'Tétel törlése a kosárból' })
  @ApiParam({ name: 'id', description: 'Kosár tétel azonosítója' })
  removeKosarTetel(@Param('id') id: number) {
    return this.rendelesService.removeKosarTetel(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Rendelés létrehozása (fizetés indítása)' })
  async createRendeles(@Body() body: any) {
    const vevoId = Number(body.vevoId || body.VevoID);
    return this.rendelesService.createRendeles(vevoId, body);
  }

  @Get('admin')
  async findAllAdmin() {
    return await this.rendelesService.findAllAdmin();
  }

  @Patch('kosartetel/update')
  @ApiOperation({ summary: 'Kosárban lévő termék mennyiségének módosítása' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        vevoId: { type: 'number' }, 
        termekId: { type: 'number' }, 
        valtozas: { type: 'number', description: 'Lehet pozitív vagy negatív irányú elmozdulás' } 
      } 
    } 
  })
  async updateKosarTetel(
    @Body('vevoId') vevoId: number,
    @Body('termekId') termekId: number,
    @Body('valtozas') valtozas: number,
  ) {
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

  @Patch(':id')
  @ApiOperation({ summary: 'Rendelés státuszának frissítése' })
  @ApiParam({ name: 'id', description: 'Rendelés azonosítója' })
  @ApiBody({ schema: { type: 'object', properties: { Statusz: { type: 'string', example: 'Teljesítve' } } } })
  async updateStatus(
    @Param('id') id: string,
    @Body('Statusz') statusz: string,
  ) {
    return await this.rendelesService.updateStatus(+id, statusz);
  }

  @Delete('/kosar/:vevoId')
  @ApiOperation({ summary: 'Egy vevő teljes kosarának törlése' })
  async removeKosar(@Param('vevoId', ParseIntPipe) vevoId: number) {
    return this.rendelesService.removeKosar(vevoId);
  }


}
