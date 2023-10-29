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
exports.Server = exports.AppType = exports.PackageType = exports.BuildType = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var BuildType;
(function (BuildType) {
    BuildType["RedisStack"] = "REDIS_STACK";
    BuildType["Electron"] = "ELECTRON";
    BuildType["DockerOnPremise"] = "DOCKER_ON_PREMISE";
})(BuildType = exports.BuildType || (exports.BuildType = {}));
var PackageType;
(function (PackageType) {
    PackageType["AppImage"] = "appimage";
})(PackageType = exports.PackageType || (exports.PackageType = {}));
var AppType;
(function (AppType) {
    AppType["RedisStackWeb"] = "REDIS_STACK_WEB";
    AppType["RedisStackApp"] = "REDIS_STACK_ELECTRON";
    AppType["Electron"] = "ELECTRON";
    AppType["Docker"] = "DOCKER";
    AppType["Unknown"] = "UNKNOWN";
})(AppType = exports.AppType || (exports.AppType = {}));
class Server {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Server.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Server.prototype, "createDateTime", void 0);
exports.Server = Server;
