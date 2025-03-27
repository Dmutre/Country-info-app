import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class GetCountryInfoDTO {
  @ApiProperty({
    description: 'The ISO 3166-1 alpha-2 code of the country',
    example: 'US',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  iso2: string;

  @ApiProperty({
    description: 'The ISO 3166-1 alpha-3 code of the country',
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  iso3: string;
}
