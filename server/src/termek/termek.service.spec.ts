import { Test, TestingModule } from '@nestjs/testing';
import { TermekService } from './termek.service';

describe('TermekService', () => {
  let service: TermekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermekService],
    }).compile();

    service = module.get<TermekService>(TermekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
