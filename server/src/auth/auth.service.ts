import {
  ConflictException,
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

    const payload = {
      sub: user.VevoID,
      email: user.VevoEmail,
      role: user.Role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        VevoID: user.VevoID,
        VevoEmail: user.VevoEmail,
        VevoNev: user.VevoNev,
        Vezeteknev: user.Vezeteknev,
        Keresztnev: user.Keresztnev,
        Telefonszam: user.Telefonszam,
        Cim: user.Cim,
        role: user.Role,
      },
    };
  }

  async signUp(dto: SignUpDto): Promise<any> {
    const existingUser = await this.vevoService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Ez az email már foglalt');
    }

    await this.vevoService.create({
      vevoNev: dto.name,
      vevoEmail: dto.email,
      vevoJelszo: dto.password,
      vezeteknev: '',
      keresztnev: '',
      telefonszam: '',
      cim: '-',
      role: undefined,
    });

    return {
      message: 'Sikeres regisztráció!',
    };
  }
}