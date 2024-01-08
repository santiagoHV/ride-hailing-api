import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704691285946 implements MigrationInterface {
    name = 'Migrations1704691285946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ride_status_enum" AS ENUM('ONROUTE', 'FINISHED')`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "status" "public"."ride_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."ride_status_enum"`);
    }

}
