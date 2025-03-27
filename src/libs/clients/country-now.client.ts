import { Injectable } from '@nestjs/common';
import { CountryNowResponse } from '../interfaces/country-now-response.interface';
import { CountryPopulation } from '../interfaces/country-population.interface';
import { Population } from '../interfaces/population.interface';
import { CountryFlag } from '../interfaces/country-flag.interface';

@Injectable()
export class CountryNowClient {
  private readonly baseUrl = 'https://countriesnow.space/api/v0.1';

  async getCountryPopulation(iso3: string): Promise<Population[]> {
    const response = await fetch(`${this.baseUrl}/countries/population`);
    const data =
      (await response.json()) as CountryNowResponse<CountryPopulation>;

    const countryPopulation = data.data.find(
      (country) => country.iso3 === iso3,
    );
    return countryPopulation?.populationCounts || [];
  }

  async getCountryFlag(iso2: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/countries/flag/images`);
    const data = (await response.json()) as CountryNowResponse<CountryFlag>;
    const countryFlag = data.data.find((country) => country.iso2 === iso2);
    return countryFlag?.flag || '';
  }
}
