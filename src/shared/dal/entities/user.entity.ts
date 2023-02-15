import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';

import { BaseEntity } from './base.entity';
import { phoneNumberTransformer } from '../../utils';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 75, nullable: false })
  public email: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  @Exclude({ toPlainOnly: true })
  public password: string;

  @Column({ type: 'varchar', length: 13, nullable: false })
  @Transform(phoneNumberTransformer, { toPlainOnly: true })
  public phone: string;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
