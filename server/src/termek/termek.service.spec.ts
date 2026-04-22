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

  describe('findAll', () => {
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
});
