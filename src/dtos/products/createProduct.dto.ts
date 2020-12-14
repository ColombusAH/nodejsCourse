import { IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(36, { message: 'id must 36 chars exactly' })
  @MaxLength(36, { message: 'id must 36 chars exactly' })
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumberString()
  itemInStock: number;
}