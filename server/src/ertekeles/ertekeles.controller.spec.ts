import { Test, TestingModule } from '@nestjs/testing';
import { ErtekelesController } from './ertekeles.controller';
import { ErtekelesService } from './ertekeles.service';
import { CreateErtekeleDto } from './dto/create-ertekele.dto';

describe('ErtekelesController', () => {
  let controller: ErtekelesController;
  let service: ErtekelesService;

  const mockErtekelesService = {
    updateErtekeles: jest.fn().mockResolvedValue({ success: true }),
    findAllErtekeles: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErtekelesController],
      providers: [
        {
          provide: ErtekelesService,
          useValue: mockErtekelesService,
        },
      ],
    }).compile();

    controller = module.get<ErtekelesController>(ErtekelesController);
    service = module.get<ErtekelesService>(ErtekelesService);
  });

  it('a controller definiálva', () => {
    expect(controller).toBeDefined();
  });

  describe('updateErtekeles', () => {
    it('hívja meg a updateErtekeles metódust', async () => {
      const vevoId = 1;
      const dto: CreateErtekeleDto = {
        VevoID: vevoId,
        TermekID: 10,
        ErtekelesSzam: 5,
      };

      await controller.updateErtekeles(vevoId, dto);
      expect(service.updateErtekeles).toHaveBeenCalledWith(dto, vevoId);
    });
  });

  describe('findAllByVevo', () => {
    it('meghívja a findAllErtekeles metódust', async () => {
      const vevoId = 1;
      await controller.findAllByVevo(vevoId);
      expect(service.findAllErtekeles).toHaveBeenCalledWith(vevoId);
    });
  });
});
