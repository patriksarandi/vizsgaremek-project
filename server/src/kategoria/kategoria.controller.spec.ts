import { Test, TestingModule } from "@nestjs/testing";
import { CreateKategoriaDto } from "./dto/create-kategoria.dto";
import { KategoriaController } from "./kategoria.controller";
import { KategoriaService } from "./kategoria.service";

describe('KategoriaController', () => {
  let controller: KategoriaController;
  let service: KategoriaService;

  const mockKategoriaService = {
    findAllKategoria: jest.fn().mockResolvedValue([
      { KategoriaID: 1, Nev: 'Gitárok' },
      { KategoriaID: 2, Nev: 'Dobok' },
    ]),
    updateKategoria: jest.fn().mockImplementation((id: number, dto: CreateKategoriaDto) =>
      Promise.resolve({ KategoriaID: id, Nev: dto.kategoriaNev }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriaController],
      providers: [
        {
          provide: KategoriaService,
          useValue: mockKategoriaService,
        },
      ],
    }).compile();

    controller = module.get<KategoriaController>(KategoriaController);
    service = module.get<KategoriaService>(KategoriaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('vissza kell adnia egy tömböt kategóriákkal', async () => {
      const result = await controller.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].Nev).toEqual('Gitárok');
      expect(service.findAllKategoria).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('sikeresen kell hívnia a service update metódusát', async () => {
      const dto: CreateKategoriaDto = { kategoriaNev: 'Zongorák' };
      const id = '1';

      const result = await controller.update(id, dto);

      expect(result.Nev).toEqual('Zongorák');
      expect(service.updateKategoria).toHaveBeenCalledWith(1, dto);
    });
  });
});