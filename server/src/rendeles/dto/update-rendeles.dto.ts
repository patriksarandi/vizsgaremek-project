import { PartialType } from '@nestjs/mapped-types';
import { CreateRendelesDto } from './create-rendeles.dto';

export class UpdateRendeleDto extends PartialType(CreateRendelesDto) {}
