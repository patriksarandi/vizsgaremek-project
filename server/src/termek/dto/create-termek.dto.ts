import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTermekDto {
    @IsInt()
    @IsNotEmpty()
    kategoriaId: number;

    @IsString()
    @IsNotEmpty()
    termekNev: string;

    @IsInt()
    @IsNotEmpty()
    termekAr: number;

    @IsInt()
    @IsNotEmpty()
    keszlet: number;
}
