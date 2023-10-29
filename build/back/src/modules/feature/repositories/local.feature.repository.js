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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFeatureRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../utils");
const feature_repository_1 = require("./feature.repository");
const feature_entity_1 = require("../entities/feature.entity");
const feature_1 = require("../model/feature");
let LocalFeatureRepository = class LocalFeatureRepository extends feature_repository_1.FeatureRepository {
    constructor(repository) {
        super();
        this.repository = repository;
    }
    async get(name) {
        const entity = await this.repository.findOneBy({ name });
        return (0, utils_1.classToClass)(feature_1.Feature, entity);
    }
    async list() {
        return (await this.repository.find()).map((entity) => (0, utils_1.classToClass)(feature_1.Feature, entity));
    }
    async upsert(feature) {
        await this.repository.upsert((0, utils_1.classToClass)(feature_entity_1.FeatureEntity, feature), {
            skipUpdateIfNoValuesChanged: true,
            conflictPaths: ['name'],
        });
        return this.get(feature.name);
    }
    async delete(name) {
        await this.repository.delete({ name });
    }
};
LocalFeatureRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feature_entity_1.FeatureEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocalFeatureRepository);
exports.LocalFeatureRepository = LocalFeatureRepository;
