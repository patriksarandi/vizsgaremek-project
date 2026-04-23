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
    findAllAdmin: jest.fn(),
    updateStatus: jest.fn(),
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

  describe('createRendeles', () => {
    it('meghívja a szervizt a vevoId-val', async () => {
      const body = { vevoId: 5, adat: 'valami' };
      mockRendelesService.createRendeles.mockResolvedValue({ id: 99 });
      const result = await controller.createRendeles(body);
      expect(service.createRendeles).toHaveBeenCalledWith(5, body);
      expect(result).toEqual({ id: 99 });
    });
  });

  describe('findAllAdmin', () => {
    it('visszaadja az összes rendelést az admin felülethez', async () => {
      const mockData = [
        { RendelesID: 1, Statusz: 'Függőben' },
        { RendelesID: 2, Statusz: 'Teljesítve' },
      ];
      mockRendelesService.findAllAdmin.mockResolvedValue(mockData);

      const result = await controller.findAllAdmin();

      expect(service.findAllAdmin).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  describe('updateStatus', () => {
    it('helyesen hívja meg a szervizt a string ID konvertálásával', async () => {
      const idStr = '15';
      const ujStatusz = 'Teljesítve';
      const expectedResult = { RendelesID: 15, Statusz: ujStatusz };

      mockRendelesService.updateStatus.mockResolvedValue(expectedResult);

      const result = await controller.updateStatus(idStr, ujStatusz);

      expect(service.updateStatus).toHaveBeenCalledWith(15, ujStatusz);
      expect(result).toEqual(expectedResult);
    });

    it('hibát továbbít, ha a service elbukik', async () => {
      mockRendelesService.updateStatus.mockRejectedValue(
        new Error('Update failed'),
      );

      await expect(controller.updateStatus('1', 'Törölve')).rejects.toThrow(
        'Update failed',
      );
    });
  });
});
