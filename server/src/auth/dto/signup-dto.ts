import { IsString, IsNotEmpty, IsEmail, IsEnum } from "class-validator";
import { VevoRole } from "src/vevo/dto/create-vevo.dto";

export class SignUpDto {
  @IsString({ message: 'A név szöveg típusú kell legyen!'})
  @IsNotEmpty({ message: 'A név megadása kötelező!'})
  name: string;
  
  @IsEmail()
  @IsNotEmpty({ message: 'Az e-mail megadása kötelező' })
  email: string;

  @IsString({ message: 'A jelszó szöveg típusú kell legyen!'})
  @IsNotEmpty({ message: 'A jelszó megadása kötelező! '})
  password: string;

  @IsEnum(VevoRole)
  role: VevoRole
}