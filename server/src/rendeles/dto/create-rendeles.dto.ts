import { IsInt, IsNotEmpty } from "class-validator";

export class FizetesiKosarDto {
    @IsInt({message: "A vevő azonosítója szám!"})
    @IsNotEmpty({message: "A vevő azonosítója nem lehet üres!"})
    VevoID: number;
}

export class KosarTetelDto {
    @IsInt({message: "A kosár azonosítója szám!"})
    @IsNotEmpty({message: "A kosár azonosítója nem lehet üres!"})
    KosarID: number;

    @IsInt({message: "A termék azonosítója szám!"})
    @IsNotEmpty({message: "A termék azonosítója nem lehet üres!"})
    TermekID: number;

    @IsInt({message: "A tétel mennyiség szám!"})
    @IsNotEmpty({message: "A tétel mennyiség nem lehet üres!"})
    TetelMennyiseg: number;

    VevoID: number;
}

export class RendeltTermekDto {
    RendelesID: number;
    TermekID: number;
    RendeltMennyiseg: number;
    RendeltEgysegar: number;
}

export class CreateRendelesDto {
    VevoID: number;
    RendelesiDatum: Date;
    RendelesiVegosszeg: number;
    Statusz: string;
}
