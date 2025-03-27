import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty({
    description: 'The message to be displayed',
    example: 'Calendar events added successfully',
  })
  message: string;
}
