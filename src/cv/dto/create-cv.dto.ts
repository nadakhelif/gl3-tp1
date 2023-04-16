import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCvDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  age: number;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  cin: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}
