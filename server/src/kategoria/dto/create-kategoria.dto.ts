import { IsNotEmpty, IsString } from "class-validator";

export class CreateKategoriaDto {
    @IsString()
    @IsNotEmpty()
    kategoriaNev: string;
}
