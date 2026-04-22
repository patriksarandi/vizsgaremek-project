import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsEmail({}, { message: 'Érvénytelen e-mail formátum!'})
  @IsNotEmpty({ message: 'Az e-mail megadása kötelező!'})
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A jelszó megadása kötelező!'})
  password: string;

}