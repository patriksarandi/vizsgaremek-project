import { Injectable } from '@nestjs/common';
import { CreateRendeleDto } from './dto/create-rendele.dto';
import { UpdateRendeleDto } from './dto/update-rendeles.dto';

@Injectable()
export class RendelesService {
  create(createRendeleDto: CreateRendeleDto) {
    return 'This action adds a new rendele';
  }

  findAll() {
    return `This action returns all rendeles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rendele`;
  }

  update(id: number, updateRendeleDto: UpdateRendeleDto) {
    return `This action updates a #${id} rendele`;
  }

  remove(id: number) {
    return `This action removes a #${id} rendele`;
  }
}
