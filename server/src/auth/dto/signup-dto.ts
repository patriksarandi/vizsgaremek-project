import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  MinLength,
} from 'class-validator';
import { VevoRole } from 'src/vevo/dto/create-vevo.dto';

export class SignUpDto {
  @ApiProperty({ example: 'Teszt Elek', description: 'A felhasználó teljes neve'})
  @IsString({ message: 'A név szöveg típusú kell legyen!' })
  @IsNotEmpty({ message: 'A név megadása kötelező!' })
  name: string;

  @ApiProperty({ example: 'teszt@gmail.com', description: 'Egyedi e-mail cím'})
  @IsEmail({}, { message: 'Érvénytelen e-mail formátum!' })
  @IsNotEmpty({ message: 'Az e-mail megadása kötelező' })
  email: string;

  @ApiProperty({ example: 'Jelszo123', description: 'Legalább 8 karakter hosszú jelszó'})
  @IsString({ message: 'A jelszó szöveg típusú kell legyen!' })
  @IsNotEmpty({ message: 'A jelszó megadása kötelező! ' })
  @MinLength(8, {
    message: 'A jelszónak legalább 8 karakter hosszúnak kell lennie!',
  })
  password: string;

  @ApiProperty({ enum: VevoRole, example: VevoRole.USER, description: 'A felhasználó jogosultsági köre'})
  @IsEnum(VevoRole, { message: 'Érvénytelen szerepkör!' })
  role: VevoRole;
}
