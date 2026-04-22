import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { VevoService } from 'src/vevo/vevo.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockVevoService = { findByEmail: jest.fn() };
  const mockJwtService = { signAsync: jest.fn() };
  const mockPrismaService = {
    vevo: { findFirst: jest.fn(), create: jest.fn() },
    fizetesiKosar: { create: jest.fn() },
    $transaction: jest.fn((cb) => cb(mockPrismaService)),
  };

  beforeEach(async () => {
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
});