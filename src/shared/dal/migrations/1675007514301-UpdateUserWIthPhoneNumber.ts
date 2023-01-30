import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserWIthPhoneNumber1675007514301
  implements MigrationInterface
{
  name = 'UpdateUserWIthPhoneNumber1675007514301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`phone\` varchar(13) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
  }
}
