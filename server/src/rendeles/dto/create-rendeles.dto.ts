import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, Min } from "class-validator";

export class FizetesiKosarDto {
    @ApiProperty({ example: 1, description: 'A kosárhoz tartozó vevő egyedi azonosítója' })
    @IsInt({message: "A vevő azonosítója szám!"})
    @IsNotEmpty({message: "A vevő azonosítója nem lehet üres!"})
    VevoID: number;
}

export class KosarTetelDto {
    @ApiPropertyOptional({ example: 10, description: 'A kosár azonosítója (opcionális, ha már létezik)' })
    @IsOptional()
    @IsInt({message: "A kosár azonosítója szám!"})
    KosarID?: number;

    @ApiProperty({ example: 5, description: 'A kosárba helyezett termék azonosítója' })
    @IsInt({message: "A termék azonosítója szám!"})
    @IsNotEmpty({message: "A termék azonosítója nem lehet üres!"})
    TermekID: number;

    @ApiProperty({ example: 2, description: 'A kosárba tenni kívánt mennyiség', minimum: 1 })
    @IsInt({message: "A tétel mennyiség szám!"})
    @Min(1, { message: 'Legalább 1 terméket a kosárba kell tenni!'})
    @IsPositive()
    @IsNotEmpty({message: "A tétel mennyiség nem lehet üres!"})
    TetelMennyiseg: number;

    @ApiProperty({ example: 1, description: 'A műveletet végző vevő azonosítója' })
    @IsInt()
    @IsNotEmpty()
    VevoID: number;
}

export class RendeltTermekDto {
    @ApiProperty({ example: 123, description: 'A létrejött rendelés azonosítója' })
    @IsInt()
    RendelesID: number;

    @ApiProperty({ example: 5, description: 'A megrendelt termék azonosítója' })
    @IsInt()
    TermekID: number;

    @ApiProperty({ example: 3, description: 'A megrendelt mennyiség', minimum: 1 })
    @IsInt()
    @Min(1)
    RendeltMennyiseg: number;

    @ApiProperty({ example: 5000, description: 'A termék egységára a vásárlás pillanatában' })
    @IsPositive()
    RendeltEgysegar: number;
}

export class CreateRendelesDto {
    @ApiProperty({ example: 1, description: 'A rendelést leadó vevő azonosítója' })
    @IsInt()
    VevoID: number;

    @ApiPropertyOptional({ 
        example: '2026-04-23T18:00:00Z', 
        description: 'A rendelés időpontja (alapértelmezetten a jelenlegi idő)' 
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    RendelesiDatum: Date;

    @ApiProperty({ example: 15500, description: 'A rendelés teljes bruttó végösszege' })
    @IsPositive()
    RendelesiVegosszeg: number;
}
