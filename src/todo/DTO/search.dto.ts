import { TodoStatusEnum } from '../entities/TodoStatusEnum';
import { IsOptional } from 'class-validator';

export class SearchDTO {
  @IsOptional()
  critere: string;
  @IsOptional()
  status: TodoStatusEnum;
}
