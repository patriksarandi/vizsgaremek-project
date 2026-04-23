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

@Controller('termek')
export class TermekController {
  constructor(private readonly termekService: TermekService) {}

  @Post()
  create(@Body() createTermekDto: CreateTermekDto) {
    return this.termekService.create(createTermekDto);
  }

  @Get('brands')
  findAllBrands() {
    return this.termekService.findAllBrands();
  }

  @Get()
  async findAll(@Req() req: any) {
    const vevoId = req.user?.id;
    
    return this.termekService.findAll({
      ...req.query,
      vevoId: vevoId ? Number(vevoId) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termekService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTermekDto: UpdateTermekDto) {
    return this.termekService.update(+id, updateTermekDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termekService.remove(+id);
  }
}
