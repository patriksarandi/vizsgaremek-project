import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
    let strategy: JwtStrategy;
    let configService: ConfigService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('TEST-KULCS')
                    },
                },
            ],
        }).compile();

        strategy = module.get<JwtStrategy>(JwtStrategy);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('jwtstrategy definiálva', () => {
        expect(strategy).toBeDefined();
    });

    describe('validáció', () => {
        it('visszaadja a user adatokat, ha a payload érvényes', async () => {
            const payload = {
                sub: 1,
                email: 'test@email.hu',
                role: 'USER'
            };

            const result = await strategy.validate(payload);

            expect(result).toEqual({
                id: payload.sub,
                email: payload.email,
                role: payload.role,
            });
        });

        it('UnauthorizedException-t dob, ha nincs sub a payloadban', async () => {
            const invalidPayload = {
                email: 'teszt@email.hu',
                role: 'USER',
            } as any;

            await expect(strategy.validate(invalidPayload)).rejects.toThrow(
                UnauthorizedException
            )
        })
    })
})