import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VevoService } from './vevo.service';
import { CreateVevoDto, VevoRole } from './dto/create-vevo.dto';
import { UpdateVevoDto } from './dto/update-vevo.dto';
import { ApiResponse, ApiOperation, ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('vevo')
@Controller('vevo')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class VevoController {
  constructor(private readonly vevoService: VevoService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'A bejelentkezett felhasználó saját profiljának lekérése', description: 'A JWT token alapján azonosított felhasználó adatai.' })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés.' })
  @ApiResponse({ status: 401, description: 'Nincs érvényes token.' })
  @Get('profile')
  getProfile(@Request() req) {
    return this.vevoService.findOne(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'A bejelentkezett felhasználó saját adatainak módosítása' })
  @ApiResponse({ status: 200, description: 'Profil sikeresen frissítve.' })
  @Patch('profile')
  updateProfile(@Request() req, @Body() dto: UpdateVevoDto) {
    return this.vevoService.update(req.user.id, dto, false)
  }

  @Post()
  @ApiOperation({ summary: 'Új vevő regisztrációja', description: 'Új vevő létrehozása a rendszerben.' })
  @ApiResponse({ status: 201, description: 'Sikeres regisztráció.', type: CreateVevoDto })
  @ApiResponse({ status: 400, description: 'Validációs hiba vagy foglalt e-mail.' })
  create(@Body() createVevoDto: CreateVevoDto) {
    return this.vevoService.create(createVevoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Az összes vevő listázása (Admin)' })
  @ApiResponse({ status: 200, description: 'Sikeres listázás', type: [CreateVevoDto] })
  findAll(@Request() req) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Csak adminisztrátor kérheti le a felhasználók listáját.');
    }

    return this.vevoService.findAll();
  }

  @Get('search/:email')
  @ApiOperation({ summary: 'Vevő keresése e-mail cím alapján' })
  @ApiParam({ name: 'email', description: 'Keresett e-mail cím', example: 'teszt@email.hu' })
  findByEmail(@Param('email') email: string) {
    return this.vevoService.findByEmail(email);
  }

  @Patch(':id/cim')
  @ApiOperation({ summary: 'Vevő szállítási címének frissítése' })
  updateSzallitasiCim(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVevoDto,
  ) {
    return this.vevoService.updateSzallitasiCim(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Vevő lekérése azonosító alapján' })
  @ApiParam({ name: 'id', type: 'number', example: 1, description: 'A vevő egyedi azonosítója.' })
  @ApiResponse({ status: 200, type: CreateVevoDto })
  @ApiResponse({ status: 404, description: 'Vevő nem található.'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vevoService.findOne(id);
  }

  @Patch(':id/teljes-nev')
  @ApiOperation({ summary: 'Vevő nevének módosítása' })
  async updateTeljesNev(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVevoDto,
  ) {
    const result = await this.vevoService.updateNev(id, dto);
    return {
      success: true,
      message: 'A név módosítása sikeresen megtörtént.',
      data: result,
    };
  }

  @Patch(':id/telefonszam')
  @ApiOperation({ summary: 'Vevő telefonszámának frissítése' })
  async updateTelefonszam(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVevoDto,
  ) {
    return await this.vevoService.updateTelefonszam(id, dto);
  }

  @Patch(':id/email')
  @ApiOperation({ summary: 'Vevő e-mail címének frissítése' })
  async updateEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVevoDto,
  ) {
    return await this.vevoService.updateEmail(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Felhasználói fiók törlése' })
  @ApiParam({ name: 'id', description: 'A törlendő felhasználó azonosítója' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    if (req.user.role !== 'ADMIN' && req.user.id !== id) {
      throw new ForbiddenException('Nincs jogosultságod más fiókját törölni!')
    }

    return this.vevoService.remove(id);
  }
}
