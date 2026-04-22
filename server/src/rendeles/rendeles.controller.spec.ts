import { Test, TestingModule } from "@nestjs/testing";
import { RendelesController } from "./rendeles.controller"
import { RendelesService } from "./rendeles.service";
import { BadRequestException } from "@nestjs/common";

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
            providers: [
                { provide: RendelesService, useValue: mockRendelesService },
            ],
        }).compile();

        controller = module.get<RendelesController>(RendelesController);
        service = module.get<RendelesService>(RendelesService);
    });

    it('definiálva', () => {
        expect(controller).toBeDefined();
    })

    describe('createFizetesiKosar', () => {
        it('hibát dob ha nincs VevoID', async () => {
            const dto = { VevoID: undefined };
            await expect(() => controller.createFizetesiKosar(dto as any))
            .toThrow(BadRequestException);
        });

        it('meghívja a service-t és választ ad', async () => {
            const dto = { VevoID: 1 };
            mockRendelesService.createFizetesiKosar.mockResolvedValue({ id: 1 });
            const result = await controller.createFizetesiKosar(dto as any);
            expect(service.createFizetesiKosar).toHaveBeenCalledWith(dto);
            expect(result.message).toBe('A fizetési kosár sikeresen létrehozva');
        })
    })
})