import { GetUsersDto, User, UserRepository } from '@shared';
import { Test } from '@nestjs/testing';

import { UserService } from './user.service';
import { OrmConfig } from '../../../orm.config';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let users: User[];

  beforeAll(async () => {
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

  beforeEach(() => {
    users = [
      {
        id: 1,
        uuid: '6a35c97a-6148-4818-b606-8bc804d42816',
        email: 'test@test.com',
        password: 'test',
        createdAt: new Date('2023-01-20 12:00:00'),
        updatedAt: new Date('2023-01-20 12:00:00'),
        async hashPassword(): Promise<void> {},
        toJSON(): Record<string, any> {
          return {};
        },
        async generateUuid(): Promise<void> {},
      },
      {
        id: 2,
        uuid: '78676cbe-243a-4f93-b92d-a96f900ac245',
        email: 'test1@test.com',
        password: 'test1',
        createdAt: new Date('2023-01-20 12:00:00'),
        updatedAt: new Date('2023-01-20 12:00:00'),
        async hashPassword(): Promise<void> {},
        toJSON(): Record<string, any> {
          return {};
        },
        async generateUuid(): Promise<void> {},
      },
    ];
  });

  describe('getUsers', () => {
    let localUsers: User[] = [];

    beforeAll(async () => {
      jest
        .spyOn(userService, 'getUsers')
        .mockImplementation(
          async (getUsersDto: GetUsersDto): Promise<User[]> => {
            if (!Object.keys(getUsersDto).length) {
              return users;
            }

            if (getUsersDto.orderBy && getUsersDto.sortBy) {
              return localUsers.sort((a, b) => {
                if (
                  getUsersDto.orderBy === 'ASC' &&
                  a[getUsersDto.sortBy] > b[getUsersDto.sortBy]
                ) {
                  return 1;
                }

                if (
                  getUsersDto.orderBy === 'ASC' &&
                  a[getUsersDto.sortBy] < b[getUsersDto.sortBy]
                ) {
                  return -1;
                }

                if (
                  getUsersDto.orderBy === 'DESC' &&
                  a[getUsersDto.sortBy] < b[getUsersDto.sortBy]
                ) {
                  return 1;
                }

                if (
                  getUsersDto.orderBy === 'DESC' &&
                  a[getUsersDto.sortBy] > b[getUsersDto.sortBy]
                ) {
                  return -1;
                }

                return 0;
              });
            }

            if (getUsersDto.limit && getUsersDto.offset) {
              return localUsers.splice(getUsersDto.offset, getUsersDto.limit);
            }
          },
        );
    });

    beforeEach(() => {
      localUsers = users;
    });

    it('should return array of all users', async () => {
      expect(await userService.getUsers({})).toBe(localUsers);
    });

    it('should return ASC sorted array of users sorted by id field', async () => {
      const result = [...localUsers];

      expect(
        await userService.getUsers({ orderBy: 'ASC', sortBy: 'id' }),
      ).toEqual(result);
    });

    it('should return DESC sorted array of users sorted by id field', async () => {
      const result = [...localUsers].sort((a, b) => (a.id < b.id ? 1 : -1));

      expect(
        await userService.getUsers({ orderBy: 'DESC', sortBy: 'id' }),
      ).toEqual(result);
    });

    it('should return array of users according to limit and offset', async () => {
      const result: User[] = [];
      result.push(localUsers[1]);

      expect(await userService.getUsers({ limit: 1, offset: 1 })).toEqual(
        result,
      );
    });
  });

  describe('getUser', () => {
    beforeAll(() => {
      jest
        .spyOn(userService, 'getUser')
        .mockImplementation(async (id: number): Promise<User> => {
          const user = users.find((user) => user.id === id);

          if (!user) {
            throw new NotFoundException();
          }

          return user;
        });
    });

    it('should return existed user', async () => {
      const result = users[0];

      expect(await userService.getUser(users[0].id)).toEqual(result);
    });

    it('should throw NotFoundException', async () => {
      await expect(
        userService.getUser(users[users.length - 1].id + 1),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
