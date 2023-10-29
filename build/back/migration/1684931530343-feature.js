"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature1684931530343 = void 0;
class Feature1684931530343 {
    constructor() {
        this.name = 'Feature1684931530343';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "features" ("name" varchar PRIMARY KEY NOT NULL, "flag" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "features_config" ("id" varchar PRIMARY KEY NOT NULL, "controlNumber" float, "data" varchar NOT NULL, "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "features_config"`);
        await queryRunner.query(`DROP TABLE "features"`);
    }
}
exports.Feature1684931530343 = Feature1684931530343;
