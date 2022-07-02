import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePeopleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  professionalExperience: string;
}
