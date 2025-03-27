import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Country } from '../interfaces/country.interface';
import { CountryInfo } from '../interfaces/country-info.interface';
import { Border } from '../interfaces/border.interface';
import { Holiday } from '../interfaces/holiday.interface';

@Injectable()
export class NagerClient {
  private readonly baseUrl = 'https://date.nager.at/api/v3';

  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new HttpException(
        `API request failed with status ${response.status}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
    return (await response.json()) as T;
  }

  async getCountries(): Promise<Country[]> {
    return this.fetchWithErrorHandling<Country[]>(
      `${this.baseUrl}/AvailableCountries`,
    );
  }

  async getCountryBorders(iso2: string): Promise<Border[]> {
    const countryInfo = await this.fetchWithErrorHandling<CountryInfo>(
      `${this.baseUrl}/CountryInfo/${iso2}`,
    );
    return countryInfo?.borders ?? [];
  }

  async getCountryHolidays(iso2: string, year: number): Promise<Holiday[]> {
    return this.fetchWithErrorHandling<Holiday[]>(
      `${this.baseUrl}/PublicHolidays/${year}/${iso2}`,
    );
  }
}
