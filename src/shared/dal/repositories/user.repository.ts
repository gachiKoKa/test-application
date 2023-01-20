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
    if (filter.orderBy && filter.sortBy) {
      qb.orderBy(filter.sortBy, filter.orderBy);
    }

    qb.limit(filter.limit ?? 20).offset(filter.offset ?? 0);

    return qb;
  }
}
