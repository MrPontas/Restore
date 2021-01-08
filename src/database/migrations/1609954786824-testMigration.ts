import { query } from 'express';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class testMigration1609954786824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teste',
        columns: [
          {
            name: 'id',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teste');
  }
}
