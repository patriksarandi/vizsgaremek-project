import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TermekService } from './termek.service';
import { CreateTermekDto } from './dto/create-termek.dto';
import { UpdateTermekDto } from './dto/update-termek.dto';

@Controller('termek')
export class TermekController {
  constructor(private readonly termekService: TermekService) {}

  @Post()
  create(@Body() createTermekDto: CreateTermekDto) {
    return this.termekService.create(createTermekDto);
  }

  @Get()
  findAll() {
    return this.termekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termekService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermekDto: UpdateTermekDto) {
    return this.termekService.update(+id, updateTermekDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termekService.remove(+id);
  }
}
