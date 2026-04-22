import { PrismaService } from "src/prisma.service";
import { RendelesService } from "./rendeles.service";
import { Test, TestingModule } from "@nestjs/testing";



const mockPrisma = {
    fizetesiKosar: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
    },
    kosarTetel: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn()
    },
    termek: {
        findUnique: jest.fn(),
        update: jest.fn(),
    },
    rendeles: {
        create: jest.fn(),
        findMany: jest.fn(),
    },
    $transaction: jest.fn()
};

describe('RendelesService', () => {
    let service: RendelesService;
    let db: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RendelesService,
                {provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<RendelesService>(RendelesService);
        db = module.get<PrismaService>(PrismaService);
    });

    it('definiálva', () => {
        expect(service).toBeDefined();
    })
})