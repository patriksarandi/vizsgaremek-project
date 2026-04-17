import { PartialType } from '@nestjs/mapped-types';
import { CreateErtekeleDto } from './create-ertekele.dto';

export class UpdateErtekeleDto extends PartialType(CreateErtekeleDto) {}
