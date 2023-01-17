import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude, instanceToPlain } from 'class-transformer';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude({ toPlainOnly: true })
  public id: number;

  @Column({ type: 'varchar', length: 36, nullable: false })
  public uuid: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  public async generateUuid() {
    this.uuid = uuid();
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
