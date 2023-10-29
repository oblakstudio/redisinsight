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
exports.LocalFeaturesConfigRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../../utils");
const features_config_repository_1 = require("./features-config.repository");
const features_config_entity_1 = require("../entities/features-config.entity");
const features_config_1 = require("../model/features-config");
const defaultConfig = require("../../../../config/features-config.json");
let LocalFeaturesConfigRepository = class LocalFeaturesConfigRepository extends features_config_repository_1.FeaturesConfigRepository {
    constructor(repository) {
        super();
        this.repository = repository;
        this.logger = new common_1.Logger('LocalFeaturesConfigRepository');
        this.id = '1';
    }
    generateControlNumber() {
        const controlNumber = Number((parseInt((Math.random() * 10000).toString(), 10) / 100).toFixed(2));
        this.logger.log('Control number is generated', controlNumber);
        return controlNumber;
    }
    async getOrCreate() {
        this.logger.log('Getting features config entity');
        let entity = await this.repository.findOneBy({ id: this.id });
        if (!entity) {
            this.logger.log('Creating features config entity');
            entity = await this.repository.save((0, class_transformer_1.plainToClass)(features_config_entity_1.FeaturesConfigEntity, {
                id: this.id,
                data: defaultConfig,
                controlNumber: this.generateControlNumber(),
            }));
        }
        return (0, utils_1.classToClass)(features_config_1.FeaturesConfig, entity);
    }
    async update(data) {
        await this.repository.update({ id: this.id }, (0, class_transformer_1.plainToClass)(features_config_entity_1.FeaturesConfigEntity, { data, id: this.id }));
        return this.getOrCreate();
    }
};
LocalFeaturesConfigRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(features_config_entity_1.FeaturesConfigEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocalFeaturesConfigRepository);
exports.LocalFeaturesConfigRepository = LocalFeaturesConfigRepository;
