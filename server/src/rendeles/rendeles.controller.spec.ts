import { Test, TestingModule } from "@nestjs/testing";
import { RendelesController } from "./rendeles.controller"
import { RendelesService } from "./rendeles.service";

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
})