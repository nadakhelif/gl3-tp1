import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ErrorMessage } from '../errorMessage';
import { TodoStatusEnum } from '../entities/todostatusEnum';

export class TodoUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: ErrorMessage.MinLengthError })
  @MaxLength(10, { message: ErrorMessage.MaxLengthError })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: ErrorMessage.MaxLengthError })
  description: string;
  @IsOptional()
  @IsIn(['actif', 'waiting', 'done'])
  status: TodoStatusEnum;
}
