import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class GetProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(36, { message: 'id must 36 chars exactly' })
  @MaxLength(36, { message: 'id must 36 chars exactly' })
  id: string;
}