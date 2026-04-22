import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateKategoriaDto {
    @IsString({ message: 'A kategória neve szöveg kell legyen!'})
    @IsNotEmpty({ message: 'A kategória nevét kötelező megadni!'})
    @MinLength(2, { message: 'A név legalább 2 karakter hosszú legyen!'})
    kategoriaNev: string;
}
