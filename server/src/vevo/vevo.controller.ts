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

@Controller('vevo')
export class VevoController {
  constructor(private readonly vevoService: VevoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return this.vevoService.findOne(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  updateProfile(@Request() req, @Body() dto: UpdateVevoDto) {
    return this.vevoService.update(req.user.id, dto)
  }

  @Post()
  create(@Body() createVevoDto: CreateVevoDto) {
    return this.vevoService.create(createVevoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    console.log('Lekérte: ', req.user);
    return this.vevoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vevoService.findOne(id);
  }

  @Get('search/:email')
  findByEmail(@Param('email') email: string) {
    return this.vevoService.findByEmail(email);
  }

  @Patch(':id/teljes-nev')
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
  async updateTelefonszam(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVevoDto,
  ) {
    return await this.vevoService.updateTelefonszam(id, dto);
  }

  @Patch(':id/email')
  async updateEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVevoDto,
  ) {
    return await this.vevoService.updateEmail(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vevoService.remove(+id);
  }
}
