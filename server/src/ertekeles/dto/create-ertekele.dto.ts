import { IsInt, Max, Min } from "class-validator";

export class CreateErtekeleDto {
    @IsInt()
    VevoID: number;

    @IsInt()
    TermekID: number;

    @IsInt()
    @Min(0)
    @Max(5)
    ErtekelesSzam: number;
}
