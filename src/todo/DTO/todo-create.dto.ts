import { MaxLength, MinLength } from 'class-validator';
import { ErrorMessage } from '../errorMessage';

export class TodoCreateDTO {
  @MinLength(3, { message: ErrorMessage.MinLengthError })
  @MaxLength(10, { message: ErrorMessage.MaxLengthError })
  name: string;
  @MinLength(10, {
    message: ErrorMessage.MinLengthError,
  })
  description: string;
}
