import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateTermekDto {
  @ApiProperty({
    example: 2,
    description: 'A termékhez tartozó kategória egyedi azonosítója',
  })
  @IsInt({ message: 'A kategória azonosítója egész szám kell legyen!' })
  @IsNotEmpty({ message: 'A kategória megadása kötelező!' })
  KategoriaID: number;

  @ApiProperty({
    example: 'Fender Gitár',
    description: 'A termék megnevezése',
  })
  @IsString({ message: 'A termék neve szöveg kell legyen!' })
  @IsNotEmpty({ message: 'A termék nevének megadása kötelező!' })
  TermekNev: string;

  @ApiProperty({
    example: 24990,
    description: 'A termék ára',
    minimum: 0,
  })
  @IsInt({ message: 'A termék ára szám kell legyen!' })
  @Min(0, { message: 'A termék ára nem lehet negatív' })
  @IsNotEmpty({ message: 'Az ár megadása kötelező!' })
  TermekAr: number;

  @ApiProperty({
    example: 50,
    description: 'A raktáron lévő mennyiség',
    minimum: 0,
  })
  @IsInt({ message: 'A készlet egész szám kell legyen!' })
  @Min(0, { message: 'A termék ára nem lehet negatív!' })
  @IsNotEmpty({ message: 'Az ár megadása kötelező!' })
  Keszlet: number;

  @ApiPropertyOptional({ 
        example: 'Sony', 
        description: 'A termék gyártója vagy márkája' 
    })
  @IsString({ message: 'A márka szöveg kell legyen!' })
  @IsOptional()
  Brand: string;
}
