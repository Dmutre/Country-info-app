import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { ClientModule } from '../../libs/clients/client.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from 'src/database/entities/calendar-event.entity';

@Module({
  controllers: [CountryController],
  providers: [CountryService],
  imports: [
    ClientModule,
    UsersModule,
    TypeOrmModule.forFeature([CalendarEvent]),
  ],
})
export class CountryModule {}
