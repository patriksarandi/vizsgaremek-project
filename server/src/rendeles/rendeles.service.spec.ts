import { PrismaService } from 'src/prisma.service';
import { RendelesService } from './rendeles.service';
import { Test, TestingModule } from '@nestjs/testing';

const mockPrisma = {
  fizetesiKosar: {
    upsert: jest.fn(),
    findUnique: jest.fn(),
  },
  kosarTetel: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  termek: {
    findUnique: jest.fn(),
    update: jest.fn(), // Ez is kell a készlet csökkentéshez
  },
  rendeles: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  rendeltTermek: {
    create: jest.fn(),
  },
  $transaction: jest.fn(),
};

describe('RendelesService', () => {
  let service: RendelesService;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RendelesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<RendelesService>(RendelesService);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('RendelesService', () => {
    let service: RendelesService;
    let db: PrismaService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          RendelesService,
          { provide: PrismaService, useValue: mockPrisma },
        ],
      }).compile();

      service = module.get<RendelesService>(RendelesService);
      db = module.get<PrismaService>(PrismaService);
    });

    describe('createFizetesiKosar', () => {
      it('sikeresen létrehozza/frissíti a kosarat', async () => {
        const dto = { VevoID: 1 };
        mockPrisma.fizetesiKosar.upsert.mockResolvedValue({
          KosarID: 1,
          VevoID: 1,
        });
        const result = await service.createFizetesiKosar(dto as any);
        expect(db.fizetesiKosar.upsert).toHaveBeenCalled();
        expect(result.ujFizetesiKosar.VevoID).toEqual(1);
      });
    });

    describe('findKosarTetelByVevoId', () => {
      it('kiszámolja az összeget', async () => {
        const mockKosar = {
          VevoID: 1,
          Tetelek: [{ TetelMennyiseg: 2, Termek: { TermekAr: 1000 } }],
        };
        mockPrisma.fizetesiKosar.findUnique.mockResolvedValue(mockKosar);
        const result = (await service.findKosarTetelByVevoId(1)) as any;

        expect(result.Vegosszeg).toBe(2000);
      });

      it('hibát dob, ha nincs kosár', async () => {
        mockPrisma.fizetesiKosar.findUnique.mockResolvedValue(null);
        const result = (await service.findKosarTetelByVevoId(999)) as any;
        expect(result.message).toBe('A kosár nem található!');
      });
    });
  });

  describe('createKosarTetel', () => {
    it('Hibaüzenetet dob, ha nincs elég termék a készleten', async () => {
      mockPrisma.fizetesiKosar.upsert.mockResolvedValue({ KosarID: 1 });
      mockPrisma.termek.findUnique.mockResolvedValue({ Keszlet: 5 });
      mockPrisma.kosarTetel.findUnique.mockResolvedValue(null);
      const dto = { TermekID: 1, TetelMennyiseg: 10, KosarID: 1, VevoID: 1 };

      await expect(service.createKosarTetel(dto, 1)).rejects.toThrow(
        'Nincs elég készleten a kért mennyiséghez!',
      );
    });
  });

  describe('createRendeles', () => {
    it('sikeres rendelésnél üríti a kosarat és csökkenti a készletet', async () => {
      const mockKosar = {
        KosarID: 1,
        Tetelek: [
          {
            TermekID: 1,
            TetelMennyiseg: 1,
            Termek: { TermekAr: 100, Keszlet: 10, TermekNev: 'Teszt' },
          },
        ],
      };

      mockPrisma.fizetesiKosar.findUnique.mockResolvedValue(mockKosar);
      mockPrisma.$transaction.mockImplementation(
        async (callback) => await callback(mockPrisma),
      );
      mockPrisma.rendeles.create.mockResolvedValue({ RendelesID: 123 });

      const result = await service.createRendeles(1, {
        RendelesiDatum: new Date(),
      } as any);

      expect(result.RendelesID).toBe(123);
      expect(db.kosarTetel.deleteMany).toHaveBeenCalled();
    });
  });
});
