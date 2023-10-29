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
exports.CustomTutorial = exports.CustomTutorialActions = void 0;
const class_transformer_1 = require("class-transformer");
const path_1 = require("path");
const config_1 = require("../../../utils/config");
const PATH_CONFIG = config_1.default.get('dir_path');
var CustomTutorialActions;
(function (CustomTutorialActions) {
    CustomTutorialActions["CREATE"] = "create";
    CustomTutorialActions["DELETE"] = "delete";
    CustomTutorialActions["SYNC"] = "sync";
})(CustomTutorialActions = exports.CustomTutorialActions || (exports.CustomTutorialActions = {}));
class CustomTutorial {
    get actions() {
        const actions = [CustomTutorialActions.DELETE];
        if (this.link) {
            actions.push(CustomTutorialActions.SYNC);
        }
        return actions;
    }
    get path() {
        return `/${this.id}`;
    }
    get absolutePath() {
        return (0, path_1.join)(PATH_CONFIG.customTutorials, this.id);
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomTutorial.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomTutorial.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomTutorial.prototype, "uri", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomTutorial.prototype, "link", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CustomTutorial.prototype, "createdAt", void 0);
exports.CustomTutorial = CustomTutorial;
