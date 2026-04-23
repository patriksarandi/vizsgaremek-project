import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { SignInDto } from './dto/signin-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bejelentkezés és JWT token generálása' })
  @ApiResponse({ status: 200, description: 'Sikeres bejelentkezés, visszaadja a tokent.' })
  @ApiResponse({ status: 401, description: 'Hibás e-mail vagy jelszó.' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Új felhasználó regisztrációja' })
  @ApiResponse({ status: 201, description: 'A felhasználó sikeresen létrejött.' })
  @ApiResponse({ status: 400, description: 'Az e-mail cím már foglalt vagy hibás adatok.' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }
}
