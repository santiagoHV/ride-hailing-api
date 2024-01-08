import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704691373596 implements MigrationInterface {
    name = 'Migrations1704691373596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endLat" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endLng" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endTime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endLng" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endLat" SET NOT NULL`);
    }

}
