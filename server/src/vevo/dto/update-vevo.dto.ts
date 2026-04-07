import { PartialType } from '@nestjs/mapped-types';
import { CreateVevoDto } from './create-vevo.dto';
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdateVevoDto extends PartialType(CreateVevoDto) {
    @IsString()
    @MinLength(2)
    vezeteknev: string;

    @IsString()
    @MinLength(2)
    keresztnev: string;

    @IsString()
    @IsPhoneNumber('HU')
    telefonszam: string;

    @IsEmail()
    vevoEmail: string;
}
