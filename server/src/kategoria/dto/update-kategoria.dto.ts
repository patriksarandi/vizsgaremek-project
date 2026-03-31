import { PartialType } from '@nestjs/mapped-types';
import { CreateKategoriaDto } from './create-kategoria.dto';

export class UpdateKategoriaDto extends PartialType(CreateKategoriaDto) {}
