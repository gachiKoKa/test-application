import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

import { User } from '../entities';
import { GetUsersDto } from '../dtos';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  public async getUsers(getUsersDto: GetUsersDto): Promise<User[]> {
    let qb = this.createQueryBuilder('user');
    qb = this.buildWhereQuery(getUsersDto, qb);

    return qb.getMany();
  }

  private buildWhereQuery(filter: GetUsersDto, qb: SelectQueryBuilder<User>) {
    if (filter.orderBy) {
      qb.orderBy('id', filter.orderBy);
    }

    return qb;
  }
}
