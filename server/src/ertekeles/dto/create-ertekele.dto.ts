import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateErtekeleDto {
    @IsInt()
    @IsNotEmpty()
    VevoID: number;

    @IsInt()
    @IsNotEmpty()
    TermekID: number;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    ErtekelesSzam: number;
}
