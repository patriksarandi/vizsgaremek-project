export class FizetesiKosarDto {
    vevoId: number;
}

export class KosarTetelDto {
    kosarId: number;
    termekId: number;
    tetelMennyiseg: number;
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
