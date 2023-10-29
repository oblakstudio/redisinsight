"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureSso1691476419592 = void 0;
class FeatureSso1691476419592 {
    constructor() {
        this.name = 'FeatureSso1691476419592';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_features" ("name" varchar PRIMARY KEY NOT NULL, "flag" boolean NOT NULL, "strategy" varchar, "data" text)`);
        await queryRunner.query(`INSERT INTO "temporary_features"("name", "flag") SELECT "name", "flag" FROM "features"`);
        await queryRunner.query(`DROP TABLE "features"`);
        await queryRunner.query(`ALTER TABLE "temporary_features" RENAME TO "features"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "features" RENAME TO "temporary_features"`);
        await queryRunner.query(`CREATE TABLE "features" ("name" varchar PRIMARY KEY NOT NULL, "flag" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "features"("name", "flag") SELECT "name", "flag" FROM "temporary_features"`);
        await queryRunner.query(`DROP TABLE "temporary_features"`);
    }
}
exports.FeatureSso1691476419592 = FeatureSso1691476419592;
