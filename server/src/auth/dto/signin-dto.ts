import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: 'teszt@gmail.com', description: 'A felhasználó e-mail címe.'})
  @IsEmail({}, { message: 'Érvénytelen e-mail formátum!'})
  @IsNotEmpty({ message: 'Az e-mail megadása kötelező!'})
  email: string;

  @ApiProperty({ example: 'Jelszo123', description: 'A felhasználó jelszava'})
  @IsString({ message: 'Érvénytelen jelszó formátum!' })
  @IsNotEmpty({ message: 'A jelszó megadása kötelező!'})
  password: string;
}