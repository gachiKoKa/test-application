import { User, UserRepository } from '@shared';
import { Test } from '@nestjs/testing';

import { UserService } from './user.service';
import { OrmConfig } from '../../../orm.config';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: () => new UserRepository(OrmConfig),
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should return empty array of users', async () => {
      const result: User[] = [];

      jest
        .spyOn(userService, 'getUsers')
        .mockImplementation(async () => result);

      expect(await userService.getUsers({})).toBe(result);
    });
  });
});
