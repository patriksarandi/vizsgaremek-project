import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum, IsOptional } from "class-validator";

export enum VevoRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
export class CreateVevoDto {
    @IsString()
    @IsNotEmpty()
    VevoNev: string;

    @IsEmail({}, { message: 'Érvénytelen e-mail cím!' })
    VevoEmail: string;

    @IsString()
    @MinLength(8, { message: 'A jelszónak legalább 8 karakternek kell lennie!' })
    VevoJelszo: string;

    @IsString()
    @IsOptional()
    Vezeteknev?: string;

    @IsString()
    @IsOptional()
    Keresztnev?: string;

    @IsString()
    @IsOptional()
    Telefonszam?: string;

    @IsString()
    @IsOptional()
    Cim?: string;

    
    @IsEnum(VevoRole)
    @IsOptional()
    Role: VevoRole;
}
