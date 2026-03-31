import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VevoService } from 'src/vevo/vevo.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup-dto';

@Injectable()
export class AuthService {
  constructor(
    private vevoService: VevoService,
    private db: PrismaService
) {}

  async signIn(email: string, password: string): Promise<any> {
    try {
        const customer = await this.vevoService.findByEmail(email);

        if (!customer) {
        throw new UnauthorizedException('Hibás e-mail cím vagy jelszó!');
        }

        const isPasswordMatching = await bcrypt.compare(password, customer.VevoJelszo)

        if (!isPasswordMatching) {
            throw new UnauthorizedException('Hibás e-mail cím vagy jelszó!')
        }

        const { VevoJelszo, ...result } = customer;
        return result;
    } catch (e) {
        console.error("Hiba történt:", e);
        throw e
    }
  }

  async signUp(dto: SignUpDto): Promise<any> {
    const existingUser = await this.db.vevo.findFirst({
        where: { VevoEmail: dto.email }
    });
    if (existingUser) {
      throw new ConflictException('Ez az e-mail cím vagy név már foglalt!');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return await this.vevoService.create({
      vevoNev: dto.name,
      vevoEmail: dto.email,
      vevoJelszo: hashedPassword,
      vevoRole: dto.role,
      cim: '-',
    });
  }
}
