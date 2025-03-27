import { ApiProperty } from '@nestjs/swagger';
import { Border } from '../../../libs/interfaces/border.interface';
import { Population } from '../../../libs/interfaces/population.interface';

export class CountryInfoResponse {
  @ApiProperty({
    description: 'The ISO 3166-1 alpha-2 code of the country',
    example: 'US',
  })
  countryCode: string;

  @ApiProperty({
    description: 'The borders of the country',
    example: [
      {
        commonName: 'United States of America',
        officialName: 'United States of America',
        countryCode: 'US',
        region: 'North America',
        borders: null,
      },
    ],
  })
  borders: Border[];

  @ApiProperty({
    description: 'The population of the country',
    example: [
      {
        year: 2020,
        value: 331002651,
      },
    ],
  })
  population: Population[];

  @ApiProperty({
    description: 'The flag of the country',
    example: 'https://flagcdn.com/w40/us.png',
  })
  flag: string;
}
