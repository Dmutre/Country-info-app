import { Population } from './population.interface';

export interface CountryPopulation {
  country: string;
  code: number;
  iso3: string;
  populationCounts: Population[];
}
