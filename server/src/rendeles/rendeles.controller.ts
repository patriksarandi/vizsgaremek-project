import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RendelesService } from './rendeles.service';
import { CreateRendeleDto } from './dto/create-rendele.dto';
import { UpdateRendeleDto } from './dto/update-rendeles.dto';

@Controller('rendeles')
export class RendelesController {
  constructor(private readonly rendelesService: RendelesService) {}

  @Post()
  create(@Body() createRendeleDto: CreateRendeleDto) {
    return this.rendelesService.create(createRendeleDto);
  }

  @Get()
  findAll() {
    return this.rendelesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rendelesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRendeleDto: UpdateRendeleDto) {
    return this.rendelesService.update(+id, updateRendeleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rendelesService.remove(+id);
  }
}
