import { IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(36, { message: 'id must 36 chars exactly' })
  @MaxLength(36, { message: 'id must 36 chars exactly' })
  categoryId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsNumberString()
  itemInStock: number;
}
