import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { VevoService } from '../vevo/vevo.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockVevoService: any;
  let mockJwtService: any;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockVevoService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    mockJwtService = {
      signAsync: jest.fn(),
    };

    mockPrismaService = {
      vevo: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
      fizetesiKosar: {
        create: jest.fn(),
      },
      $transaction: jest.fn((cb) => cb(mockPrismaService)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: VevoService, useValue: mockVevoService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('legyen definiálva a service', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('Helytelen jelszó esetén hibaüzenet', async () => {
      mockVevoService.findByEmail.mockResolvedValue({
        VevoJelszo: 'hashed_pw',
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        service.signIn('teszt@gmail.com', 'rossz-pw'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('Sikeres belépésnél visszaadja a tokent és a felhasználót', async () => {
      mockVevoService.findByEmail.mockResolvedValue({
        VevoID: 1,
        VevoEmail: 't@e.hu',
        VevoJelszo: 'hash',
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      mockJwtService.signAsync.mockResolvedValue('kamu_token');

      const result = await service.signIn('t@e.hu', 'jo-pw');

      expect(result).toHaveProperty('access_token', 'kamu_token');
      expect(result.user.VevoEmail).toBe('t@e.hu');
    });
  });

  describe('signUp', () => {
    it('Foglalt email esetén hibaüzenetet dob', async () => {
      mockVevoService.findByEmail.mockResolvedValue({
        VevoID: 1,
        VevoEmail: 'hibas@email.hu',
      });

      await expect(
        service.signUp({
          email: 'hibas@email.hu',
          password: '123',
          name: 'Teszt Elek',
        } as any),
      ).rejects.toThrow(ConflictException);

      expect(mockVevoService.create).not.toHaveBeenCalled();
      expect(mockPrismaService.fizetesiKosar.create).not.toHaveBeenCalled();
    });

    it('Sikeres regisztrációnál menti a vevőt és inicializálja a kosarat', async () => {
      mockVevoService.findByEmail.mockResolvedValue(null);

      mockVevoService.create.mockResolvedValue({
        VevoID: 10,
        VevoNev: 'Teszt Elek',
        VevoEmail: 'masik@gmail.hu',
      });

      const result = await service.signUp({
        email: 'masik@gmail.hu',
        password: '123',
        name: 'Teszt Elek',
      } as any);

      expect(result.message).toBe('Sikeres regisztráció!');

      expect(mockVevoService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          vevoNev: 'Teszt Elek',
          vevoEmail: 'masik@gmail.hu',
          vevoJelszo: '123',
        }),
      );
    });
  });
});