import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePeople } from './create-people';

interface message {
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): message {
    return { message: 'Hello world!' };
  }

  @Post()
  registerPeople(@Body() createPeople: CreatePeople) {}
}
