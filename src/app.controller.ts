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
  async getHello() {
    const dados = await this.appService.getAll();
    const dadosIndex = dados.map((i, index) => {
      return {
        row: index + 1,
        ...i,
        professionalExperience: `${i.professionalExperience.slice(0, 50)}....`,
      };
    });
    return { dadosIndex };
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
