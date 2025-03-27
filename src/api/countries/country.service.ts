import { Injectable } from '@nestjs/common';
import { GetCountryInfoDTO } from './dto/get-country-info.dto';
import { CountryNowClient } from '../../libs/clients/country-now.client';
import { NagerClient } from '../../libs/clients/nager.client';
import { CountryInfoResponse } from './response/country-info.response';
import { Country } from 'src/libs/interfaces/country.interface';

@Injectable()
export class CountryService {
  constructor(
    private readonly nagerClient: NagerClient,
    private readonly countryNowClient: CountryNowClient,
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
}
