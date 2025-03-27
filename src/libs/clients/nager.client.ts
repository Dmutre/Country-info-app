import { Injectable } from '@nestjs/common';
import { Country } from '../interfaces/country.interface';
import { CountryInfo } from '../interfaces/country-info.interface';
import { Border } from '../interfaces/border.interface';

@Injectable()
export class NagerClient {
  private readonly baseUrl = 'https://date.nager.at/api/v3';

  async getCountries(): Promise<Country[]> {
    const response = await fetch(`${this.baseUrl}/AvailableCountries`);
    return (await response.json()) as Country[];
  }

  async getCountryBorders(iso2: string): Promise<Border[]> {
    const response = await fetch(`${this.baseUrl}/CountryInfo/${iso2}`);
    const countryInfo = (await response.json()) as CountryInfo;
    return countryInfo?.borders || [];
  }
}
