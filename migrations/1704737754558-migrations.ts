import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704737754558 implements MigrationInterface {
    name = 'Migrations1704737754558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "creationDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "cancellationDate" TIMESTAMP`);
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" "public"."payment_status_enum" NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "cancellationDate"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "date" TIMESTAMP NOT NULL`);
    }

}
