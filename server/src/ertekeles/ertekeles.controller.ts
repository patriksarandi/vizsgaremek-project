import { Controller, Body, Patch, Req, Param, ParseIntPipe, Get, Delete } from '@nestjs/common';
import { ErtekelesService } from './ertekeles.service';
import { CreateErtekeleDto } from './dto/create-ertekele.dto';

@Controller('ertekeles')
export class ErtekelesController {
  constructor(private readonly ertekelesService: ErtekelesService) {}

  @Patch(':vevoId')
  updateErtekeles(
    @Param('vevoId', ParseIntPipe) vevoId: number,
    @Body() createErtekeleDto: CreateErtekeleDto, 
  ) {
    return this.ertekelesService.updateErtekeles(createErtekeleDto, vevoId);
  }

  @Get(':vevoId/osszes')
  findAllByVevo(@Param('vevoId', ParseIntPipe) vevoId: number) {
    return this.ertekelesService.findAllErtekeles(vevoId);
  }

  @Delete(':termekId')
  removeErtekeles(@Param('termekId', ParseIntPipe) termekId: number, @Req() req: any) {
    return this.ertekelesService.removeErtekeles(req.user.VevoID, termekId)
  }
}
