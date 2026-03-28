import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Az e-mail megadása kötelező!' })
  email: string;

  @IsString({ message: 'A jelszó szöveg típusú kell legyen!' })
  @IsNotEmpty({ message: 'A jelszó megadása kötelező!' })
  password: string;
}