import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateTermekDto {
    @IsInt({ message: 'A kategória azonosítója egész szám kell legyen!' })
    @IsNotEmpty({ message: 'A kategória megadása kötelező!' })
    KategoriaID: number;

    @IsString({ message: 'A termék neve szöveg kell legyen!' })
    @IsNotEmpty({ message: 'A termék nevének megadása kötelező!' })
    TermekNev: string;

    @IsInt({ message: 'A termék ára szám kell legyen!' })
    @Min(0, { message: 'A termék ára nem lehet negatív'})
    @IsNotEmpty({ message: 'Az ár megadása kötelező!' })
    TermekAr: number;

    @IsInt({ message: 'A készlet egész szám kell legyen!' })
    @Min(0, { message: 'A termék ára nem lehet negatív!'})
    @IsNotEmpty({ message: 'Az ár megadása kötelező!' })
    Keszlet: number;

    @IsString({ message: 'A márka szöveg kell legyen!' })
    @IsOptional()
    Brand: string;
}
