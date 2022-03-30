import { Controller, Get, Header } from '@nestjs/common';
import { AppService, Obj } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): Obj {
    return this.appService.getHello();
  }
}
