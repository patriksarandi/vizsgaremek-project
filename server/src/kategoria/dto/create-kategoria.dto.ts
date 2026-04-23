import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateKategoriaDto {
    @ApiProperty({ example: 'Húros', description: 'A kategória egyedi megnevezése', minLength: 2})
    @IsString({ message: 'A kategória neve szöveg kell legyen!'})
    @IsNotEmpty({ message: 'A kategória nevét kötelező megadni!'})
    @MinLength(2, { message: 'A név legalább 2 karakter hosszú legyen!'})
    kategoriaNev: string;
}
