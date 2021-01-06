import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1609332956633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isNullable: false,
            isUnique: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'login',
            type: 'varchar(25)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'administrator',
            type: 'boolean',
            default: false,
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
