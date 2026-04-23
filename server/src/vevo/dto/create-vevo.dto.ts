import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum, IsOptional } from "class-validator";

export enum VevoRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
export class CreateVevoDto {
    @ApiProperty({ 
        example: 'teszt123', 
        description: 'A felhasználó egyedi felhasználóneve' 
    })
    @IsString()
    @IsNotEmpty()
    VevoNev: string;

    @ApiProperty({ 
        example: 'teszt@email.hu', 
        description: 'Kapcsolattartási e-mail cím' 
    })
    @IsEmail({}, { message: 'Érvénytelen e-mail cím!' })
    VevoEmail: string;

    @ApiProperty({ 
        example: 'Jelszo123', 
        description: 'A fiók jelszava (minimum 8 karakter)',
        minLength: 8 
    })
    @IsString()
    @MinLength(8, { message: 'A jelszónak legalább 8 karakternek kell lennie!' })
    VevoJelszo: string;

    @ApiPropertyOptional({ example: 'Teszt', description: 'Vezetéknév' })
    @IsString()
    @IsOptional()
    Vezeteknev?: string;

    @ApiPropertyOptional({ example: 'Teszt', description: 'Keresztnév' })
    @IsString()
    @IsOptional()
    Keresztnev?: string;

    @ApiPropertyOptional({ example: '+36301234567', description: 'Telefonos elérhetőség' })
    @IsString()
    @IsOptional()
    Telefonszam?: string;

    @ApiPropertyOptional({ example: '1051 Budapest, Deák tér 1.', description: 'Szállítási/számlázási cím' })
    @IsString()
    @IsOptional()
    Cim?: string;

    @ApiProperty({ 
        enum: VevoRole, 
        example: VevoRole.USER,
        description: 'A felhasználó jogosultsági szintje' 
    })
    @IsEnum(VevoRole)
    @IsOptional()
    Role: VevoRole;
}
