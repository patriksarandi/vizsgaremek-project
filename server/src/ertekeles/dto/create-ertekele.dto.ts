import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";

export class CreateErtekeleDto {
    @ApiProperty({ example: 1, description: 'Az értékelést leadó vevő egyedi azonosítója' })
    @IsInt()
    VevoID: number;

    @ApiProperty({ example: 2, description: 'Az értékelt termék egyedi azonosítója' })
    @IsInt()
    TermekID: number;

    @ApiProperty({ example: 5, description: 'Az értékelés mértéke (0 és 5 közötti egész szám)', minimum: 0, maximum: 5 })
    @IsInt()
    @Min(0)
    @Max(5)
    ErtekelesSzam: number;
}
