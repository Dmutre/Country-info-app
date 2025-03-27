import { Module } from '@nestjs/common';
import { NagerClient } from './nager.client';
import { CountryNowClient } from './country-now.client';

@Module({
  providers: [NagerClient, CountryNowClient],
  exports: [NagerClient, CountryNowClient],
})
export class ClientModule {}
