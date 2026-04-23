import { PrismaService } from 'src/prisma.service';
import { KategoriaService } from './kategoria.service';
import { TestingModule, Test } from '@nestjs/testing';

describe('KategoriaService', () => {
  let service: KategoriaService;
  let db: PrismaService;

  const mockPrismaService = {
    kategoria: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KategoriaService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<KategoriaService>(KategoriaService);
    db = module.get<PrismaService>(PrismaService);
  });

  it('definiálva', () => {
    expect(service).toBeDefined();
  });

  describe('updateKategoria', () => {
    const mockId = 1;
    const mockDto = { kategoriaNev: 'Frissített Gitár' };

    it('frissíti a kategóriát', async () => {
      mockPrismaService.kategoria.findUnique.mockResolvedValue({
        KategoriaID: mockId,
        IsDeleted: false,
      });

      mockPrismaService.kategoria.update.mockResolvedValue({
        KategoriaID: mockId,
        Nev: mockDto.kategoriaNev,
      });

      const result = await service.updateKategoria(mockId, mockDto);

      expect(result.Nev).toEqual(mockDto.kategoriaNev);

      expect(db.kategoria.update).toHaveBeenCalled();

      expect(db.kategoria.update).toHaveBeenCalledWith({
        where: { KategoriaID: mockId },
        data: { Nev: mockDto.kategoriaNev },
      });
    });
  });
});
