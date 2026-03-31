import { PartialType } from '@nestjs/mapped-types';
import { CreateTermekDto } from './create-termek.dto';

export class UpdateTermekDto extends PartialType(CreateTermekDto) {}
