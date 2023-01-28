import { GetUsersDto, User, UserRepository } from '@shared';
import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let users: User[];
  let throwFindException = false;
  let throwSaveException = false;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: () => ({
            getUsers: jest.fn(
              async (getUsersDto: GetUsersDto): Promise<User[]> => [],
            ),
            create: jest.fn((entityLike: DeepPartial<User>): User => users[0]),
            save: jest.fn(async (entity: User): Promise<User> => {
              if (throwSaveException) {
                throw new BadRequestException();
              }

              return users[0];
            }),
            findOne: jest.fn(
              async (options: FindOneOptions<User>): Promise<User> => {
                if (throwFindException) {
                  throw new NotFoundException();
                }

                return users[0];
              },
            ),
          }),
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
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

  describe('createUser', () => {
    beforeEach(() => {
      throwSaveException = false;
    });

    it('should saved a new user', async () => {
      const actualUser = await userService.createUser({
        email: 'test@test.com',
        password: 'test',
      });
      const expectedUser = users[0];

      expect(actualUser).toEqual(expectedUser);
    });

    it('should throw an error during saving user', async () => {
      throwSaveException = true;

      await expect(
          userService.createUser({
            email: 'test@test.com',
            password: 'test',
          }),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('updateUser', () => {
    beforeEach(() => {
      throwFindException = false;
      throwSaveException = false;
    });

    it('should update a user', async () => {
      const actualResult = await userService.updateUser(1, users[0]);
      const expectedResult = users[0];

      expect(actualResult).toEqual(expectedResult);
    });

    it('should not find a user', async () => {
      throwFindException = true;

      await expect(userService.updateUser(1, users[0])).rejects.toThrowError(NotFoundException);
    });

    it('should not save a user', async () => {
      throwSaveException = true;

      await expect(userService.updateUser(1, users[0])).rejects.toThrowError(BadRequestException);
    });
  });

  describe('getUser', () => {
    beforeEach(() => {
      throwFindException = false;
    });

    it('should return a user', async () => {
      const actualResult = await userService.getUser(1);
      const expectedResult = users[0];

      expect(actualResult).toEqual(expectedResult);
    });

    it('should throw an error when user not found', async () => {
      throwFindException = true;

      await expect(userService.getUser(1)).rejects.toThrowError(
          NotFoundException,
      );
    });
  });

  describe('getUsers', () => {
    it('should be called with correct parameters', async () => {
      await userService.getUsers({ orderBy: 'ASC' });

      expect(userRepository.getUsers).toHaveBeenCalledWith({ orderBy: 'ASC' });
    });
  });
});
