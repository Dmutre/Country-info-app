import { Injectable } from '@nestjs/common';
import { GetCountryInfoDTO } from './dto/get-country-info.dto';
import { CountryNowClient } from '../../libs/clients/country-now.client';
import { NagerClient } from '../../libs/clients/nager.client';
import { CountryInfoResponse } from './response/country-info.response';
import { Country } from '../../libs/interfaces/country.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEvent } from '../../database/entities/calendar-event.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AddCalendarEventDTO } from './dto/add-calendar-event.dto';
import { MessageResponse } from './response/message.response';
import { GetCalendarEventsDTO } from './dto/get-calendar-events.dto';

@Injectable()
export class CountryService {
  constructor(
    private readonly nagerClient: NagerClient,
    private readonly countryNowClient: CountryNowClient,
    @InjectRepository(CalendarEvent)
    private readonly calendarEventRepository: Repository<CalendarEvent>,
    private readonly userService: UsersService,
  ) {}

  async getCountryInfo({
    iso2,
    iso3,
  }: GetCountryInfoDTO): Promise<CountryInfoResponse> {
    const [borders, population, flag] = await Promise.all([
      this.nagerClient.getCountryBorders(iso2),
      this.countryNowClient.getCountryPopulation(iso3),
      this.countryNowClient.getCountryFlag(iso2),
    ]);

    return {
      countryCode: iso2,
      borders,
      population,
      flag,
    };
  }

  async getCountries(): Promise<Country[]> {
    return await this.nagerClient.getCountries();
  }

  async addCalendarEvent(
    userId: string,
    dto: AddCalendarEventDTO,
  ): Promise<MessageResponse> {
    const { countryCode, year, holidays } = dto;

    await this.userService.findUser({ id: userId }); // check if user exists

    const countryHolidays = await this.nagerClient.getCountryHolidays(
      countryCode,
      year,
    );

    const newEvents = holidays.filter(
      (holiday) => !countryHolidays.some((h) => h.name === holiday),
    );

    const calendarEvents = newEvents.map((event) => {
      return this.calendarEventRepository.create({
        user: { id: userId },
        countryCode,
        year,
        name: event,
      });
    });

    await this.calendarEventRepository.save(calendarEvents);

    return { message: 'Calendar events added successfully' };
  }

  async getCalendarEventsForUser(
    userId: string,
    dto: GetCalendarEventsDTO,
  ): Promise<string[]> {
    const { year, countryCode } = dto;

    const calendarEvents = await this.calendarEventRepository
      .find({
        where: { user: { id: userId }, year, countryCode },
      })
      .then((events) => events.map((event) => event.name));

    const countryHolidays = await this.nagerClient
      .getCountryHolidays(countryCode, year)
      .then((holidays) => holidays.map((holiday) => holiday.name));

    return countryHolidays.concat(calendarEvents);
  }
}
