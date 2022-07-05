import { CreatePeopleDTO } from './create-people';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import PeopleModel from './models/people';

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
  loadingRegister(@Query('id') id) {
    const idConvert = parseInt(id);
    if (idConvert && idConvert !== NaN) {
      const people = this.appService.getById(idConvert);
      return people;
    }
    return new PeopleModel();
  }

  @Post('/save')
  registerPeople(@Body() createPeople: CreatePeopleDTO) {
    return this.appService.createPeople(createPeople);
  }
}
