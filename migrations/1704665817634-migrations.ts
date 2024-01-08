import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704665817634 implements MigrationInterface {
    name = 'Migrations1704665817634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_source" ("id" SERIAL NOT NULL, "externalId" character varying NOT NULL, "brand" character varying NOT NULL, "lastFour" integer NOT NULL, "userId" integer, CONSTRAINT "PK_b5b9aed9149498bc5b034fcb46d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "currency" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "paymentSourceId" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "startLat" double precision NOT NULL, "startLng" double precision NOT NULL, "endLat" double precision NOT NULL, "endLng" double precision NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "driverId" integer, "riderId" integer, "paymentId" integer, CONSTRAINT "REL_0d2db52cae8696209366c38b66" UNIQUE ("paymentId"), CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_source" ADD CONSTRAINT "FK_7b0b22efc9c6620560c0b234233" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_374cdd995e7d66c68b264730285" FOREIGN KEY ("paymentSourceId") REFERENCES "payment_source"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_b9b4f7b8620f247e424a9c465b5" FOREIGN KEY ("riderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_0d2db52cae8696209366c38b666" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_0d2db52cae8696209366c38b666"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_b9b4f7b8620f247e424a9c465b5"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_374cdd995e7d66c68b264730285"`);
        await queryRunner.query(`ALTER TABLE "payment_source" DROP CONSTRAINT "FK_7b0b22efc9c6620560c0b234233"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "payment_source"`);
    }

}
