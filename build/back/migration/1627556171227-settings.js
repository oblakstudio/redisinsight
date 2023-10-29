"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings1627556171227 = void 0;
class settings1627556171227 {
    constructor() {
        this.name = 'settings1627556171227';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "settings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "data" varchar)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "settings"`);
    }
}
exports.settings1627556171227 = settings1627556171227;
