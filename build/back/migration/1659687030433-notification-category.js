"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationCategory1659687030433 = void 0;
class notificationCategory1659687030433 {
    constructor() {
        this.name = 'notificationCategory1659687030433';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_notification" ("type" varchar NOT NULL, "timestamp" integer NOT NULL, "title" varchar NOT NULL, "body" text NOT NULL, "read" boolean NOT NULL DEFAULT (0), "category" varchar, "categoryColor" varchar, PRIMARY KEY ("type", "timestamp"))`);
        await queryRunner.query(`INSERT INTO "temporary_notification"("type", "timestamp", "title", "body", "read") SELECT "type", "timestamp", "title", "body", "read" FROM "notification"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`ALTER TABLE "temporary_notification" RENAME TO "notification"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "notification" RENAME TO "temporary_notification"`);
        await queryRunner.query(`CREATE TABLE "notification" ("type" varchar NOT NULL, "timestamp" integer NOT NULL, "title" varchar NOT NULL, "body" text NOT NULL, "read" boolean NOT NULL DEFAULT (0), PRIMARY KEY ("type", "timestamp"))`);
        await queryRunner.query(`INSERT INTO "notification"("type", "timestamp", "title", "body", "read") SELECT "type", "timestamp", "title", "body", "read" FROM "temporary_notification"`);
        await queryRunner.query(`DROP TABLE "temporary_notification"`);
    }
}
exports.notificationCategory1659687030433 = notificationCategory1659687030433;
