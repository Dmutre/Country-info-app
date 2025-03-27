import { DatabaseConfig } from './database-config.interface';

export interface Config {
  port: number;
  host: string;
  database: DatabaseConfig;
}
