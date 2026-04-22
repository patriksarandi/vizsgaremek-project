import { Test, TestingModule } from "@nestjs/testing";
import { TermekController } from "./termek.controller";
import { TermekService } from "./termek.service";

describe('TermekController', () => {
    let controller: TermekController;
    let service: TermekService;

    const mockTermekService = {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        findAllBrands: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TermekController],
            providers: [
                {
                    provide: TermekService,
                    useValue: mockTermekService
                },
            ],
        }).compile();

        controller = module.get<TermekController>(TermekController);
        service = module.get<TermekService>(TermekService);
    });

    it('definiálva', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('meghívja a szervizt a query-vel és a vevő azonosítóval', async () => {
            const mockRequest = {
                query: { search: 'teszt' },
                user: { id: 10 },
            };

            const serviceSpy = jest.spyOn(service, 'findAll').mockResolvedValue([] as any);
            
            await controller.findAll(mockRequest);
            
            expect(serviceSpy).toHaveBeenCalledWith({
                search: 'teszt',
                vevoId: 10
            });
        });

        it('kezeli, ha nincs bejelentkezett felhasználó', async () => {
            const mockRequest = {
                query: { category: 'Gitár' },
                user: undefined,
            };

            const serviceSpy = jest.spyOn(service, 'findAll').mockResolvedValue([] as any);

            await controller.findAll(mockRequest);

            expect(serviceSpy).toHaveBeenCalledWith({
                category: 'Gitár',
                vevoId: undefined
            });
        });
    });
});