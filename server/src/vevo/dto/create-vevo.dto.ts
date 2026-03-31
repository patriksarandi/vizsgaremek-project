import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum } from "class-validator";

export enum VevoRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
export class CreateVevoDto {
    @IsString()
    @IsNotEmpty()
    vevoNev: string;

    @IsEmail({}, { message: 'Érvénytelen e-mail cím!' })
    vevoEmail: string;

    @IsString()
    @MinLength(8, { message: 'A jelszónak legalább 8 karakternek kell lennie!' })
    vevoJelszo: string;

    @IsString()
    @IsNotEmpty()
    cim: string;

    @IsNotEmpty()
    @IsEnum(VevoRole)
    vevoRole: VevoRole;
}
