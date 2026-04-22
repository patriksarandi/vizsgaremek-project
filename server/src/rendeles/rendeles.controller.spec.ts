import { Test, TestingModule } from '@nestjs/testing';
import { RendelesController } from './rendeles.controller';
import { RendelesService } from './rendeles.service';
import { BadRequestException } from '@nestjs/common';

describe('RendelesController', () => {
  let controller: RendelesController;
  let service: RendelesService;

  const mockRendelesService = {
    createFizetesiKosar: jest.fn(),
    findAllFizetesiKosar: jest.fn(),
    findRendelesekByVevo: jest.fn(),
    createKosarTetel: jest.fn(),
    removeKosarTetel: jest.fn(),
    createRendeles: jest.fn(),
    removeKosar: jest.fn(),
    updateKosarTetelMennyiseg: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RendelesController],
      providers: [{ provide: RendelesService, useValue: mockRendelesService }],
    }).compile();

    controller = module.get<RendelesController>(RendelesController);
    service = module.get<RendelesService>(RendelesService);
  });

  it('definiálva', () => {
    expect(controller).toBeDefined();
  });

  describe('createFizetesiKosar', () => {
    it('hibát dob ha nincs VevoID', async () => {
      const dto = { VevoID: undefined };
      await expect(() => controller.createFizetesiKosar(dto as any)).toThrow(
        BadRequestException,
      );
    });

    it('meghívja a service-t és választ ad', async () => {
      const dto = { VevoID: 1 };
      mockRendelesService.createFizetesiKosar.mockResolvedValue({ id: 1 });
      const result = await controller.createFizetesiKosar(dto as any);
      expect(service.createFizetesiKosar).toHaveBeenCalledWith(dto);
      expect(result.message).toBe('A fizetési kosár sikeresen létrehozva');
    });
  });

  describe('createKosarTetel', () => {
    it('service hiba esetén hibaüzenetet dob', async () => {
      const dto = { VevoID: 1, TermekID: 10, TetelMennyiseg: 1, KosarID: 1 };
      mockRendelesService.createKosarTetel.mockRejectedValue(
        new Error('DB hiba'),
      );

      await expect(controller.createKosarTetel(dto)).rejects.toThrow(
        'Nem sikerült a tétel a kosárhoz adni.',
      );
    });
  });

  describe('updateKosarTetel', () => {
    it('hibát dob, ha hiányoznak a kötelező mezők a body-ból', async () => {
      await expect(
        controller.updateKosarTetel(1, undefined, undefined),
      ).rejects.toThrow('Hiányzó adatok! Ellenőrizd a mezőneveket.');
    });

    it('helyesen hívja meg a szervizt megfelelő adatokkal', async () => {
      mockRendelesService.updateKosarTetelMennyiseg.mockResolvedValue({
        success: true,
      });

      await controller.updateKosarTetel(1, 101, 1);

      expect(service.updateKosarTetelMennyiseg).toHaveBeenCalledWith(1, 101, 1);
    });
  });
});
