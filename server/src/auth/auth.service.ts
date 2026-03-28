import {
    ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VevoService } from 'src/vevo/vevo.service';
import { SignUpDto } from './dto/signup-dto';

@Injectable()
export class AuthService {
  constructor(private vevoService: VevoService) {}

  async signIn(email, password): Promise<any> {
    const customer = await this.vevoService.findByEmail(email);

    if (customer?.VevoJelszo !== password) {
      throw new UnauthorizedException('Hibás e-mail cím vagy jelszó!');
    }

    const { VevoJelszo, ...result } = customer;
    return result;
  }

  async signUp(name: string, email: string, password: string): Promise<any> {
    try {
        const existingUser = await this.vevoService.findByEmail(email);

        if (existingUser) {
        throw new ConflictException('Ez az e-mail cím már foglalt!');
        }

        const newUser = await this.vevoService.create({
            vevoNev: name,
            vevoEmail: email,
            vevoJelszo: password,
            cim: '-',
        });

        return newUser;
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new ConflictException('Ez az e-mail cím már regisztrálva van!')
        }
    }
  }
}
