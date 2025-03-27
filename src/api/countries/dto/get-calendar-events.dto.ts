import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GetCalendarEventsDTO {
  @ApiProperty({
    description: 'The year to get the calendar events for',
    example: 2024,
  })
  @IsNumberString()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'The country code to get the calendar events for',
    example: 'US',
  })
  @IsString()
  @IsNotEmpty()
  countryCode: string;
}
