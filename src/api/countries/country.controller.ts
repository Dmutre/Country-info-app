import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from '../../libs/interfaces/country.interface';
import { GetCountryInfoDTO } from './dto/get-country-info.dto';
import { CountryInfoResponse } from './response/country-info.response';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddCalendarEventDTO } from './dto/add-calendar-event.dto';
import { MessageResponse } from './response/message.response';
import { GetCalendarEventsDTO } from './dto/get-calendar-events.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({
    status: 200,
    description: 'The list of countries',
    example: [
      {
        countryCode: 'US',
        name: 'United States of America',
      },
    ],
  })
  getCountries(): Promise<Country[]> {
    return this.countryService.getCountries();
  }

  @Get('/country-info')
  @ApiOperation({ summary: 'Get country info' })
  @ApiResponse({
    status: 200,
    description: 'The country info',
    type: CountryInfoResponse,
  })
  getCountryInfo(
    @Query() query: GetCountryInfoDTO,
  ): Promise<CountryInfoResponse> {
    return this.countryService.getCountryInfo(query);
  }

  @Post('/:userId/calendar-events')
  @ApiOperation({ summary: 'Add calendar events' })
  @ApiResponse({
    status: 200,
    description: 'The calendar events',
  })
  addCalendarEvents(
    @Param('userId') userId: string,
    @Body() body: AddCalendarEventDTO,
  ): Promise<MessageResponse> {
    return this.countryService.addCalendarEvent(userId, body);
  }

  @Get('/:userId/calendar-events')
  @ApiOperation({ summary: 'Get calendar events' })
  @ApiResponse({
    status: 200,
    description: 'The calendar events',
    example: ['Christmas', 'New Year'],
  })
  getCalendarEvents(
    @Param('userId') userId: string,
    @Query() query: GetCalendarEventsDTO,
  ): Promise<string[]> {
    return this.countryService.getCalendarEventsForUser(userId, query);
  }
}
