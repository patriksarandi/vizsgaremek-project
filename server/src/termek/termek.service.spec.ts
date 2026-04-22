import { Test, TestingModule } from '@nestjs/testing';
import { TermekService } from './termek.service';
import { PrismaService } from 'src/prisma.service';

const mockPrisma = {
  termek: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
};

describe('TermekService', () => {
  let service: TermekService;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TermekService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TermekService>(TermekService);
    db = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('definiálva', () => {
    expect(service).toBeDefined();
  });

  describe('findAll - Keresés', () => {
    it('keresési szűrés szavak alapján', async () => {
      const query = { search: 'Fender Gitár' };
      mockPrisma.termek.findMany.mockResolvedValue([]);

      await service.findAll(query);

      const callArgs = mockPrisma.termek.findMany.mock.calls[0][0];

      expect(callArgs.where.AND).toHaveLength(2);

      expect(callArgs.where.AND[0].OR).toContainEqual({
        TermekNev: { contains: 'Fender' },
      });

      expect(callArgs.where.AND[1].OR).toContainEqual({
        TermekNev: { contains: 'Gitár' },
      });
    });
  });

  describe('findAll - Ár és Lapozás', () => {
    it('ársáv és lapozás számítása', async () => {
      const query = { page: 2, limit: 5, minPrice: 1000, maxPrice: 5000 };
      mockPrisma.termek.findMany.mockResolvedValue([]);
      await service.findAll(query);
      const callArgs = mockPrisma.termek.findMany.mock.calls[0][0];

      expect(callArgs.skip).toBe(5);
      expect(callArgs.take).toBe(5);
      expect(callArgs.where.TermekAr).toEqual({
        gte: 1000,
        lte: 5000,
      });
    });
  });

  describe('findAll - Kategória', () => {
    it('azonosító alapján szűr, ha számot kap', async () => {
      const query = { category: '1,2,3' };
      await service.findAll(query);

      const callArgs = mockPrisma.termek.findMany.mock.calls[0][0];
      expect(callArgs.where.KategoriaID).toEqual({ in: [1, 2, 3] });
    });

    it('név alapján szűr, ha szöveget kap', async () => {
      const query = { category: 'Basszusgitár, Gitár, Vonós' };
      await service.findAll(query);

      const callArgs = mockPrisma.termek.findMany.mock.calls[0][0];

      expect(callArgs.where.Kategoria.Nev).toEqual({
        in: ['Basszusgitár', 'Gitár', 'Vonós'],
      });
    });
  });
});
