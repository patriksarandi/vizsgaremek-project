import { Test, TestingModule } from '@nestjs/testing';
import { ErtekelesService } from './ertekeles.service';

describe('ErtekelesService', () => {
  let service: ErtekelesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErtekelesService],
    }).compile();

    service = module.get<ErtekelesService>(ErtekelesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
