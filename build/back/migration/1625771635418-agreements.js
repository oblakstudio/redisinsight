"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agreements1625771635418 = void 0;
class agreements1625771635418 {
    constructor() {
        this.name = 'agreements1625771635418';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "agreements" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "version" varchar, "data" varchar)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "agreements"`);
    }
}
exports.agreements1625771635418 = agreements1625771635418;
