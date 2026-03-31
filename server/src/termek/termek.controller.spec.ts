import { Test, TestingModule } from '@nestjs/testing';
import { TermekController } from './termek.controller';
import { TermekService } from './termek.service';

describe('TermekController', () => {
  let controller: TermekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermekController],
      providers: [TermekService],
    }).compile();

    controller = module.get<TermekController>(TermekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
