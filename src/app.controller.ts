import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return {
      message: 'Hello',
      to:'GL3'
    }
  }

  @Get('test')
  testGet():string{
    return 'TEST OK'
  }

}
