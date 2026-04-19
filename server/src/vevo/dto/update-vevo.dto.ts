import { PartialType } from '@nestjs/mapped-types';
import { CreateVevoDto } from './create-vevo.dto';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdateVevoDto extends PartialType(CreateVevoDto) {
    @IsOptional()
    @IsString()
    @MinLength(2)
    vezeteknev?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    keresztnev?: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber('HU')
    telefonszam?: string;

    @IsOptional()
    @IsEmail()
    vevoEmail?: string;
}