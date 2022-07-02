import { Repository } from 'typeorm';
import PeopleModel from '../models/people';

export class UserRepo extends Repository<PeopleModel> {
  async createPeople(people: PeopleModel) {
    this.create(people);
  }
}
