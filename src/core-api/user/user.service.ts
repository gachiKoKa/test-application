import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  GetUsersDto,
  UpdateUserDto,
  User,
  UserRepository,
} from '@shared';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newEntity = this.userRepository.create(createUserDto);

    try {
      return this.userRepository.save(newEntity);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async getUsers(getUsersDto: GetUsersDto): Promise<User[]> {
    return this.userRepository.getUsers(getUsersDto);
  }

  public async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    const newEntity = this.userRepository.create({ ...user, ...updateUserDto });

    try {
      return this.userRepository.save(newEntity);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
