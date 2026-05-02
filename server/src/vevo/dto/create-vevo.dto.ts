import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export enum VevoRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export class CreateVevoDto {
  @ApiProperty({
    example: 'teszt123',
    description: 'A felhasználó egyedi felhasználóneve',
    required: true
  })
  @IsString()
  @IsNotEmpty({ message: 'A felhasználónév nem lehet üres!'})
  vevoNev: string;

  @ApiProperty({
    example: 'teszt@email.hu',
    description: 'E-mail cím',
    format: 'email',
  })
  @IsEmail({}, { message: 'Érvénytelen e-mail cím!' })
  vevoEmail: string;

  @ApiProperty({
    example: 'Jelszo123',
    description: 'Jelszó (min. 8 karakter)',
    minLength: 8,
    writeOnly: true
  })
  @IsString()
  @MinLength(8, { message: 'A jelszónak legalább 8 karakternek kell lennie!' })
  vevoJelszo: string;

  @ApiPropertyOptional({ example: 'Kovács', description: 'Vezetéknév' })
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'A vezetéknév legalább 2 karakter legyen!'})
  vezeteknev?: string;

  @ApiPropertyOptional({ example: 'János', description: 'Keresztnév' })
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'A keresztnév legalább 2 karakter legyen!'})
  keresztnev?: string;

  @ApiPropertyOptional({
    example: '+36301234567',
    description: 'Telefonos elérhetőség',
  })
  @IsString()
  @IsOptional()
  @IsPhoneNumber('HU', { message: 'Érvénytelen magyar telefonszám formátum!' })
  telefonszam?: string;

  @ApiPropertyOptional({
    example: '1051 Budapest, Deák tér 1.',
    description: 'Szállítási/számlázási cím',
  })
  @IsString()
  @IsOptional()
  cim?: string;

  @ApiProperty({
    enum: VevoRole,
    enumName: 'VevoRole',
    example: VevoRole.USER,
    description: 'A felhasználó jogosultsági szintje',
  })
  @IsEnum(VevoRole)
  @IsOptional()
  role: VevoRole = VevoRole.USER;
}
