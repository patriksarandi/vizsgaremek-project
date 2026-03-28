import { PartialType } from '@nestjs/mapped-types';
import { CreateVevoDto } from './create-vevo.dto';

export class UpdateVevoDto extends PartialType(CreateVevoDto) {}
