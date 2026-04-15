import { IsInt, IsNotEmpty, IsString } from "class-validator";

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
    @IsNotEmpty()
    Brand: string;
}
