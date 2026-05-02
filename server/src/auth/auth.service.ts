import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VevoService } from 'src/vevo/vevo.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup-dto';
import { JwtService } from '@nestjs/jwt';

export interface AuthResponse {
  access_token: string;
  user: any;
}

@Injectable()
export class AuthService {
  constructor(
    private vevoService: VevoService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const user = await this.vevoService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.VevoJelszo))) {
      throw new UnauthorizedException('Hibás e-mail cím vagy jelszó!');
    }

    //console.log('Bejelentkező vevő adatai az adatbázisból:', customer);

    const payload = {
      sub: user.VevoID,
      email: user.VevoEmail,
      role: user.Role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        VevoID: user.VevoID,
        VevoEmail: user.VevoEmail,
        VevoNev: user.VevoNev,
        Role: user.Role,
      },
    };
  }

  async signUp(dto: SignUpDto): Promise<any> {
    await this.vevoService.create({
      vevoNev: dto.name,
      vevoEmail: dto.email,
      vevoJelszo: dto.password,
      role: dto.role,
      vezeteknev: '',
      keresztnev: '',
      telefonszam: '',
      cim: '-',
    });

    return { message: 'Sikeres regisztráció!' };
  }
}
