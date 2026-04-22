import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    const mockAuthService = {
        signIn: jest.fn(),
        signUp: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it ('Legyen definiálva a kontroller', () => {
        expect(controller).toBeDefined();
    });

    describe('signIn', () => {
        it('Az AuthService SignIn metódus meghívása a megfelelő adatokkal.', async () => {
            const data = { email: 'teszt@gmail.com', password: '123'};
            await controller.signIn(data);
            expect(authService.signIn).toHaveBeenCalledWith(data.email, data.password);
        })
    })

    describe('signUp', () => {
        it('Az AuthService SignUp metódus meghívása a DTO-val.', async () => {
            const data = { email: 'ujEmail@gmail.com', password: '123', name: 'Uj Felhasznalo', role: 'USER' as any};
            await controller.signUp(data);
            expect(authService.signUp).toHaveBeenCalledWith(data);
        })
    })
})