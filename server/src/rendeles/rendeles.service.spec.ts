import { Test, TestingModule } from '@nestjs/testing';
import { RendelesService } from './rendeles.service';

describe('RendelesService', () => {
  let service: RendelesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RendelesService],
    }).compile();

    service = module.get<RendelesService>(RendelesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
