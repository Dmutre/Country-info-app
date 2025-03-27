import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { ClientModule } from '../../libs/clients/client.module';

@Module({
  controllers: [CountryController],
  providers: [CountryService],
  imports: [ClientModule],
})
export class CountryModule {}
