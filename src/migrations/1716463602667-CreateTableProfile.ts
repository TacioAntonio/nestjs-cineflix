import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProfile1716463602667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable('profile');

    if (!tableExist) {
      await queryRunner.query(`
            CREATE TABLE "profile" (
              "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              "name" VARCHAR(50) NOT NULL,
              "userId" UUID NOT NULL,
              "watchlistId" UUID,
              CONSTRAINT "FK_user_profile" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
              CONSTRAINT "FK_watchlist_profile" FOREIGN KEY ("watchlistId") REFERENCES "watchlist"("id") ON DELETE CASCADE
            );
        `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profile"`);
  }
}
