import { Controller, Get, Query } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from '../../libs/interfaces/country.interface';
import { GetCountryInfoDTO } from './dto/get-country-info.dto';
import { CountryInfoResponse } from './response/country-info.response';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
}
