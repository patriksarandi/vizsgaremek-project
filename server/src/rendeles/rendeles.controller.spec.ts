import { Test, TestingModule } from '@nestjs/testing';
import { RendelesController } from './rendeles.controller';
import { RendelesService } from './rendeles.service';

describe('RendelesController', () => {
  let controller: RendelesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RendelesController],
      providers: [RendelesService],
    }).compile();

    controller = module.get<RendelesController>(RendelesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
