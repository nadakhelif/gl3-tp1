import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get()
  find() {
    //console.log(`Called method: ${this.exampleMethod.name}`);
    return 'methode get';
  }
  @Post()
  create() {
    return 'methode post';
  }
  @Put()
  methode_put() {
    return 'methode put';
  }
  @Delete()
  delete() {
    return 'methode delete';
  }
}
