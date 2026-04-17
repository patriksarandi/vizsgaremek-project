import { Test, TestingModule } from '@nestjs/testing';
import { ErtekelesController } from './ertekeles.controller';
import { ErtekelesService } from './ertekeles.service';

describe('ErtekelesController', () => {
  let controller: ErtekelesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErtekelesController],
      providers: [ErtekelesService],
    }).compile();

    controller = module.get<ErtekelesController>(ErtekelesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
