import { Test, TestingModule } from '@nestjs/testing';
import { VevoController } from './vevo.controller';
import { VevoService } from './vevo.service';

describe('VevoController', () => {
  let controller: VevoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VevoController],
      providers: [VevoService],
    }).compile();

    controller = module.get<VevoController>(VevoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
