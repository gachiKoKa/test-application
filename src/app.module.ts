import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrmConfig } from '../orm.config';
import { CoreApiModule } from './core-api/core-api.module';

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig.options), CoreApiModule],
})
export class AppModule {}
