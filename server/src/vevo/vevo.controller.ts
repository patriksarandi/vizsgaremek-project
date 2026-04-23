import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VevoService } from './vevo.service';
import { CreateVevoDto, VevoRole } from './dto/create-vevo.dto';
import { UpdateVevoDto } from './dto/update-vevo.dto';
import { ApiResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('vevo')
export class VevoController {
  constructor(private readonly vevoService: VevoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: 'A bejelentkezett felhasználó saját profiljának lekérése' })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés.' })
  @ApiResponse({ status: 401, description: 'Nincs érvényes token.' })
  getProfile(@Request() req) {
    return this.vevoService.findOne(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  @ApiOperation({ summary: 'A bejelentkezett felhasználó saját adatainak módosítása' })
  @ApiResponse({ status: 200, description: 'Profil sikeresen frissítve.' })
  updateProfile(@Request() req, @Body() dto: UpdateVevoDto) {
    return this.vevoService.update(req.user.id, dto)
  }

  @Post()
  @ApiOperation({ summary: 'Új vevő regisztrációja' })
  @ApiResponse({ status: 201, description: 'Sikeres regisztráció.' })
  @ApiResponse({ status: 400, description: 'Hibás adatok vagy foglalt e-mail.' })
  create(@Body() createVevoDto: CreateVevoDto) {
    return this.vevoService.create(createVevoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Az összes vevő listázása (Admin)' })
  @Get()
  findAll(@Request() req) {
    console.log('Lekérte: ', req.user);
    return this.vevoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Vevő lekérése azonosító alapján' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vevoService.findOne(id);
  }

  @Get('search/:email')
  @ApiOperation({ summary: 'Vevő keresése e-mail cím alapján' })
  @ApiParam({ name: 'email', description: 'Keresett e-mail cím', example: 'teszt@email.hu' })
  findByEmail(@Param('email') email: string) {
    return this.vevoService.findByEmail(email);
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
  @Delete(':id')
  @ApiOperation({ summary: 'Felhasználói fiók törlése' })
  @ApiParam({ name: 'id', description: 'A törlendő felhasználó azonosítója' })
  remove(@Param('id') id: string) {
    return this.vevoService.remove(+id);
  }
}
