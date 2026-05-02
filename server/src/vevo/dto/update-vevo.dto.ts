import { PartialType } from '@nestjs/swagger';
import { CreateVevoDto } from './create-vevo.dto';

export class UpdateVevoDto extends PartialType(CreateVevoDto) {}