"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUser = void 0;
const class_transformer_1 = require("class-transformer");
const cloud_user_account_1 = require("./cloud-user-account");
const constants_1 = require("../../../../common/constants");
const model_1 = require("../../capi-key/model");
class CloudUser {
    constructor() {
        this.accounts = [];
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CloudUser.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudUser.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CloudUser.prototype, "currentAccountId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => model_1.CloudCapiKey),
    (0, class_transformer_1.Expose)({ groups: [constants_1.TransformGroup.Secure] }),
    __metadata("design:type", model_1.CloudCapiKey)
], CloudUser.prototype, "capiKey", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => cloud_user_account_1.CloudUserAccount),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CloudUser.prototype, "accounts", void 0);
exports.CloudUser = CloudUser;
