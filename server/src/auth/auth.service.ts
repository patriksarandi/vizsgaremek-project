import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
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
    private db: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const customer = await this.vevoService.findByEmail(email);

    if (!customer || !(await bcrypt.compare(password, customer.VevoJelszo))) {
      throw new UnauthorizedException('Hibás e-mail cím vagy jelszó!');
    }

    console.log('Bejelentkező vevő adatai az adatbázisból:', customer);

    const payload = {
      sub: customer.VevoID,
      email: customer.VevoEmail,
      role: customer.Role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        VevoID: customer.VevoID,
        VevoEmail: customer.VevoEmail,
        VevoNev: customer.VevoNev,
        Role: customer.Role,
        VezetekNev: customer.Vezeteknev,
        KeresztNev: customer.Keresztnev,
        Telefonszam: customer.Telefonszam,
        Cim: customer.Cim,
      },
    };
  }

  async signUp(dto: SignUpDto): Promise<any> {
    return await this.db.$transaction(async (tx) => {
      const existingUser = await tx.vevo.findFirst({
        where: { VevoEmail: dto.email },
      });
      if (existingUser)
        throw new ConflictException('Ez az e-mail cím vagy név már foglalt!');

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const ujVevo = await tx.vevo.create({
        data: {
          VevoNev: dto.name,
          VevoEmail: dto.email,
          VevoJelszo: hashedPassword,
          Role: dto.role,
          Cim: '-',
        },
      });

      await tx.fizetesiKosar.create({
        data: { VevoID: ujVevo.VevoID }
      })

      return { message: 'Sikeres regisztráció!'};
    });
  }
}
