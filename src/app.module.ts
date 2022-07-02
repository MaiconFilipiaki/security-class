// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import PeopleModel from './models/people';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [PeopleModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PeopleModel]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
