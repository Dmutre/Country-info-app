import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CountryNowResponse } from '../interfaces/country-now-response.interface';
import { CountryPopulation } from '../interfaces/country-population.interface';
import { Population } from '../interfaces/population.interface';
import { CountryFlag } from '../interfaces/country-flag.interface';

@Injectable()
export class CountryNowClient {
  private readonly baseUrl = 'https://countriesnow.space/api/v0.1';

  private async fetchWithErrorHandling<T>(url: string): Promise<T[]> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new HttpException(
        `API request failed with status ${response.status}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
    const data = (await response.json()) as CountryNowResponse<T>;
    if (data.error) {
      throw new HttpException(data.msg, HttpStatus.BAD_REQUEST);
    }
    return data.data;
  }

  async getCountryPopulation(iso3: string): Promise<Population[]> {
    const data = await this.fetchWithErrorHandling<CountryPopulation>(
      `${this.baseUrl}/countries/population`,
    );
    const countryPopulation = data.find((country) => country.iso3 === iso3);
    if (!countryPopulation) {
      throw new HttpException(
        `Country with ISO3 code ${iso3} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return countryPopulation.populationCounts;
  }

  async getCountryFlag(iso2: string): Promise<string> {
    const data = await this.fetchWithErrorHandling<CountryFlag>(
      `${this.baseUrl}/countries/flag/images`,
    );
    const countryFlag = data.find((country) => country.iso2 === iso2);
    if (!countryFlag) {
      throw new HttpException(
        `Country with ISO2 code ${iso2} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return countryFlag.flag;
  }
}
