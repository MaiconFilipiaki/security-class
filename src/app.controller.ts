import { CreatePeopleDTO } from './create-people';
import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

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

  @Get('/register')
  @Render('register')
  loadingRegister() {
    return { message: 'Hello world!' };
  }

  @Post('/create')
  registerPeople(@Body() createPeople: CreatePeopleDTO) {
    return this.appService.createPeople(createPeople);
  }
}
