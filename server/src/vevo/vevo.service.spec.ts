import { Test, TestingModule } from '@nestjs/testing';
import { VevoService } from './vevo.service';

describe('VevoService', () => {
  let service: VevoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VevoService],
    }).compile();

    service = module.get<VevoService>(VevoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
