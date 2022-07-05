import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'people' })
export default class PeopleModel {
  constructor(
    name: string = null,
    phone: string = null,
    email: string = null,
    website: string = null,
    professionalExperience: string = null,
  ) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.website = website;
    this.professionalExperience = professionalExperience;
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  website: string;

  @Column({ type: 'varchar' })
  professionalExperience: string;
}
