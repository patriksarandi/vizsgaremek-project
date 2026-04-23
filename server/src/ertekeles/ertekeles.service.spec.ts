import { PrismaService } from 'src/prisma.service';
import { ErtekelesService } from './ertekeles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ErtekelesService', () => {
  let service: ErtekelesService;
  let prisma: PrismaService;

  const mockPrisma = {
    vevo: {
      findUnique: jest.fn().mockResolvedValue({ VevoID: 1 }),
    },
    termek: {
      findUnique: jest.fn().mockResolvedValue({ TermekID: 10 }),
    },
    ertekeles: {
      upsert: jest.fn().mockResolvedValue({}),
      findMany: jest.fn().mockResolvedValue([]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ErtekelesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ErtekelesService>(ErtekelesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('létrehozza/frissíti az értékelést', async () => {
    const vevoId = 1;
    const data = { VevoID: vevoId, TermekID: 10, ErtekelesSzam: 5 };

    await service.updateErtekeles(data, vevoId);

    expect(prisma.ertekeles.upsert).toHaveBeenCalledWith({
      where: {
        VevoID_TermekID: { VevoID: vevoId, TermekID: data.TermekID },
      },
      update: { ErtekelesSzam: data.ErtekelesSzam },
      create: {
        VevoID: vevoId,
        TermekID: data.TermekID,
        ErtekelesSzam: data.ErtekelesSzam,
      },
    });
  });
});
