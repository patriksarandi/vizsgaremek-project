import { Test, TestingModule } from '@nestjs/testing';
import { KategoriaService } from './kategoria.service';

describe('KategoriaService', () => {
  let service: KategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KategoriaService],
    }).compile();

    service = module.get<KategoriaService>(KategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
