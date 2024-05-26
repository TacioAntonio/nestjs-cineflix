import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1716463597753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable('user');

    if (!tableExist) {
      await queryRunner.query(`
            CREATE TABLE "user" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "username" VARCHAR(100) NOT NULL CHECK (LENGTH("username") >= 3),
                "email" VARCHAR(50) NOT NULL,
                "password" VARCHAR(100) NOT NULL CHECK (LENGTH("password") >= 6),
                "birthdate" DATE NOT NULL
            );
        `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
