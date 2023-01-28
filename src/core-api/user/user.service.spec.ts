import { GetUsersDto, User, UserRepository } from '@shared';
import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import Mock = jest.Mock;

import { UserService } from './user.service';

type MockedRepositoryParameters =
  | GetUsersDto
  | DeepPartial<User>
  | User
  | FindOneOptions<User>;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let user: User;
  let userRepoFindException = false;
  let userRepoSaveException = false;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: (): Partial<
            Record<
              keyof UserRepository,
              Mock<User | Promise<User[] | User>, [MockedRepositoryParameters]>
            >
          > => ({
            getUsers: jest.fn(
              async (getUsersDto: GetUsersDto): Promise<User[]> => [],
            ),
            create: jest.fn((entityLike: DeepPartial<User>): User => user),
            save: jest.fn(async (entity: User): Promise<User> => {
              if (userRepoSaveException) {
                throw new BadRequestException();
              }

              return user;
            }),
            findOne: jest.fn(
              async (options: FindOneOptions<User>): Promise<User> => {
                if (userRepoFindException) {
                  throw new NotFoundException();
                }

                return user;
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
    user = {
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
    };
  });

  describe('createUser', () => {
    beforeEach(() => {
      userRepoSaveException = false;
    });

    it('should saved a new user', async () => {
      const actualResult = await userService.createUser({
        email: 'test@test.com',
        password: 'test',
      });

      expect(actualResult).toEqual(user);
    });

    it('should throw an error during saving user', async () => {
      userRepoSaveException = true;

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
      userRepoFindException = false;
      userRepoSaveException = false;
    });

    it('should update a user', async () => {
      const actualResult = await userService.updateUser(1, user);

      expect(actualResult).toEqual(user);
    });

    it('should not find a user', async () => {
      userRepoFindException = true;

      await expect(userService.updateUser(1, user)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should not save a user', async () => {
      userRepoSaveException = true;

      await expect(userService.updateUser(1, user)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('getUser', () => {
    beforeEach(() => {
      userRepoFindException = false;
    });

    it('should return a user', async () => {
      const actualResult = await userService.getUser(1);

      expect(actualResult).toEqual(user);
    });

    it('should throw an error when user not found', async () => {
      userRepoFindException = true;

      await expect(userService.getUser(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('getUsers', () => {
    it('should be called with correct parameters', async () => {
      const filter = { orderBy: 'ASC' } as Partial<GetUsersDto>;

      await userService.getUsers(filter);

      expect(userRepository.getUsers).toHaveBeenCalledWith(filter);
    });
  });
});
