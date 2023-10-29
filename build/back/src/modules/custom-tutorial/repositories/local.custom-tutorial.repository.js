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
exports.LocalCustomTutorialRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../utils");
const custom_tutorial_entity_1 = require("../entities/custom-tutorial.entity");
const custom_tutorial_1 = require("../models/custom-tutorial");
const custom_tutorial_repository_1 = require("./custom-tutorial.repository");
let LocalCustomTutorialRepository = class LocalCustomTutorialRepository extends custom_tutorial_repository_1.CustomTutorialRepository {
    constructor(repository) {
        super();
        this.repository = repository;
    }
    async create(model) {
        const entity = (0, utils_1.classToClass)(custom_tutorial_entity_1.CustomTutorialEntity, model);
        entity.createdAt = new Date();
        return (0, utils_1.classToClass)(custom_tutorial_1.CustomTutorial, await this.repository.save(entity));
    }
    async list() {
        const entities = await this.repository
            .createQueryBuilder('t')
            .orderBy('t.createdAt', 'DESC')
            .getMany();
        return entities.map((entity) => (0, utils_1.classToClass)(custom_tutorial_1.CustomTutorial, entity));
    }
    async get(id) {
        return (0, utils_1.classToClass)(custom_tutorial_1.CustomTutorial, await this.repository.findOneBy({ id }));
    }
    async delete(id) {
        await this.repository.delete({ id });
    }
};
LocalCustomTutorialRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(custom_tutorial_entity_1.CustomTutorialEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocalCustomTutorialRepository);
exports.LocalCustomTutorialRepository = LocalCustomTutorialRepository;
