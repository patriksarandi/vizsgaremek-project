import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTermekDto {
    @IsInt()
    @IsNotEmpty()
    KategoriaID: number;

    @IsString()
    @IsNotEmpty()
    TermekNev: string;

    @IsInt()
    @IsNotEmpty()
    TermekAr: number;

    @IsInt()
    @IsNotEmpty()
    Keszlet: number;

    @IsString()
    @IsOptional()
    Brand: string;
}
