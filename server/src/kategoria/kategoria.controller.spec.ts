import { Test, TestingModule } from '@nestjs/testing';
import { KategoriaController } from './kategoria.controller';
import { KategoriaService } from './kategoria.service';

describe('KategoriaController', () => {
  let controller: KategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriaController],
      providers: [KategoriaService],
    }).compile();

    controller = module.get<KategoriaController>(KategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
