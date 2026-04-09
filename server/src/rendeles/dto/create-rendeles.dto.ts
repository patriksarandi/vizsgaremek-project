import { IsInt, IsNotEmpty } from "class-validator";

export class FizetesiKosarDto {
    @IsInt({message: "A vevő azonosítója szám!"})
    @IsNotEmpty({message: "A vevő azonosítója nem lehet üres!"})
    vevoId: number;
}

export class KosarTetelDto {
    @IsInt({message: "A kosár azonosítója szám!"})
    @IsNotEmpty({message: "A kosár azonosítója nem lehet üres!"})
    kosarId: number;

    @IsInt({message: "A termék azonosítója szám!"})
    @IsNotEmpty({message: "A termék azonosítója nem lehet üres!"})
    termekId: number;

    @IsInt({message: "A tétel mennyiség szám!"})
    @IsNotEmpty({message: "A tétel mennyiség nem lehet üres!"})
    tetelMennyiseg: number;

    vevoId: number;
}

export class RendeltTermekDto {
    rendelesId: number;
    termekId: number;
    rendeltMennyiseg: number;
    rendeltEgysegar: number;
}

export class Fizetes {
    rendelesId: number;
    fizetesMod: string;
    datum: Date;
    allapot: string;
}

export class CreateRendelesDto {
    vevoId: number;
    rendelesiDatum: Date;
    rendelesiVegosszeg: number;
    statusz: string;
}
