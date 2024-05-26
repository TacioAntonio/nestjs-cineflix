import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWatchlistTable1714067716158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable('watchlist');

    if (!tableExist) {
      await queryRunner.query(`
        CREATE TABLE "watchlist" (
          "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          "movies" JSONB NOT NULL DEFAULT '[]',
          "profileId" UUID NOT NULL,
          CONSTRAINT "FK_profile_watchlist" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE
        );
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "watchlist"`);
  }
}
