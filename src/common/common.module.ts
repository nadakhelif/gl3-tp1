import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { v4 as uuid } from 'uuid';

const uuidProvider = {
  useValue: uuid,
  provide: 'UUID',
};
@Global()
@Module({
  providers: [CommonService, uuidProvider],
  exports: [uuidProvider],
})
export class CommonModule {}
