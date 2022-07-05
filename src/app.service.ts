import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'class-validator';
import { Repository } from 'typeorm';
import { CreatePeopleDTO } from './create-people';
import PeopleModel from './models/people';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PeopleModel)
    private readonly repo: Repository<PeopleModel>,
  ) {}

  async getById(id: number) {
    return await this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAll() {
    return this.repo.find();
  }

  async createPeople(createPeople: CreatePeopleDTO) {
    if (
      !createPeople.email.includes('@') ||
      !createPeople.email.includes('.com')
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Error with email informed',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
    if (
      !createPeople.website.includes('.com') ||
      !createPeople.website.includes('www')
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Error with website informed',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
    if (
      createPeople.professionalExperience.includes('cmd') ||
      createPeople.professionalExperience.includes('exec') ||
      createPeople.professionalExperience.includes('where')
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Error with professional experience informed',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
    const newPeople = new PeopleModel(
      createPeople.name,
      createPeople.phone,
      createPeople.email,
      createPeople.website,
      createPeople.professionalExperience,
    );
    if (createPeople.id && isNumber(createPeople.id)) {
      // const idString = createPeople.id.toString();
      const user = await this.getById(createPeople.id);
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: 'User not found',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      return this.repo.update({ id: user.id }, newPeople);
    }
    return this.repo.save(newPeople);
  }
}
