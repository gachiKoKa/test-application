import { Module } from '@nestjs/common';
import { UserRepository } from '@shared';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class CoreApiModule {}
