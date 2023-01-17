import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const OrmConfig = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  namingStrategy: new SnakeNamingStrategy(),
  password: 'test',
  database: 'test',
  entities: ['dist/src/shared/dal/entities/**/*.entity.{js,ts}'],
  migrations: ['dist/src/shared/dal/migrations/*.{js,ts}'],
  subscribers: [],
  logging: 'all',
  logger: 'advanced-console',
});
