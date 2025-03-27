import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class AddCalendarEventDTO {
  @ApiProperty({
    description: 'The ISO 3166-1 alpha-2 code of the country',
    example: 'US',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  countryCode: string;

  @ApiProperty({
    description: 'The year of the holiday',
    example: 2024,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'The names of the holiday',
    example: ['New Year', 'Christmas'],
  })
  @IsArray()
  @IsNotEmpty()
  holidays: string[];
}
