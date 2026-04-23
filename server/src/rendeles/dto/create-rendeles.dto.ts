import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, Min } from "class-validator";

export class FizetesiKosarDto {
    @IsInt({message: "A vevő azonosítója szám!"})
    @IsNotEmpty({message: "A vevő azonosítója nem lehet üres!"})
    VevoID: number;
}

export class KosarTetelDto {
    @IsOptional()
    @IsInt({message: "A kosár azonosítója szám!"})
    KosarID?: number;

    @IsInt({message: "A termék azonosítója szám!"})
    @IsNotEmpty({message: "A termék azonosítója nem lehet üres!"})
    TermekID: number;

    @IsInt({message: "A tétel mennyiség szám!"})
    @Min(1, { message: 'Legalább 1 terméket a kosárba kell tenni!'})
    @IsPositive()
    @IsNotEmpty({message: "A tétel mennyiség nem lehet üres!"})
    TetelMennyiseg: number;

    @IsInt()
    @IsNotEmpty()
    VevoID: number;
}

export class RendeltTermekDto {
    @IsInt()
    RendelesID: number;

    @IsInt()
    TermekID: number;

    @IsInt()
    @Min(1)
    RendeltMennyiseg: number;

    @IsPositive()
    RendeltEgysegar: number;
}

export class CreateRendelesDto {
    @IsInt()
    VevoID: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    RendelesiDatum: Date;

    @IsPositive()
    RendelesiVegosszeg: number;
}
