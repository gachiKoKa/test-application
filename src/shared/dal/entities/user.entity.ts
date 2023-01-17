import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 75, nullable: false })
  public email: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  @Exclude({ toPlainOnly: true })
  public password: string;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
