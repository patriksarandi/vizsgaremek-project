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
import { VevoService } from './vevo.service';
import { CreateVevoDto } from './dto/create-vevo.dto';
import { UpdateVevoDto } from './dto/update-vevo.dto';

@Controller('vevo')
export class VevoController {
  constructor(private readonly vevoService: VevoService) {}

  @Post()
  create(@Body() createVevoDto: CreateVevoDto) {
    return this.vevoService.create(createVevoDto);
  }

  @Get()
  findAll() {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVevoDto: UpdateVevoDto) {
    return this.vevoService.update(+id, updateVevoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vevoService.remove(+id);
  }
}
