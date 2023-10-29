"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudCapiKeys1691061058385 = void 0;
class CloudCapiKeys1691061058385 {
    constructor() {
        this.name = 'CloudCapiKeys1691061058385';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "cloud_capi_key" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "name" varchar NOT NULL, "cloudAccountId" integer NOT NULL, "cloudUserId" integer NOT NULL, "capiKey" varchar, "capiSecret" varchar, "valid" boolean DEFAULT (1), "encryption" varchar, "createdAt" datetime, "lastUsed" datetime, CONSTRAINT "UQ_9de67df9deb5d91c09c03b8d719" UNIQUE ("userId", "cloudAccountId", "cloudUserId"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "cloud_capi_key"`);
    }
}
exports.CloudCapiKeys1691061058385 = CloudCapiKeys1691061058385;
