import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704738301794 implements MigrationInterface {
    name = 'Migrations1704738301794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "actualLocationLat" double precision`);
        await queryRunner.query(`ALTER TABLE "user" ADD "actualLocationLng" double precision`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "actualLocationLng"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "actualLocationLat"`);
    }

}
