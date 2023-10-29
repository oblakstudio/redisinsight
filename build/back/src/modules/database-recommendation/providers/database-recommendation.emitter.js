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
exports.DatabaseRecommendationEmitter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../constants");
const database_recommendations_response_1 = require("../dto/database-recommendations.response");
const database_recommendation_entity_1 = require("../entities/database-recommendation.entity");
let DatabaseRecommendationEmitter = class DatabaseRecommendationEmitter {
    constructor(repository, eventEmitter) {
        this.repository = repository;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger('DatabaseRecommendationEmitter');
    }
    async newRecommendation(recommendations) {
        try {
            if (!(recommendations === null || recommendations === void 0 ? void 0 : recommendations.length)) {
                return;
            }
            this.logger.debug(`${recommendations.length} new recommendation(s) to emit`);
            const totalUnread = await this.repository
                .createQueryBuilder()
                .where({ read: false, databaseId: recommendations[0].databaseId })
                .getCount();
            this.eventEmitter.emit(constants_1.RecommendationServerEvents.Recommendation, recommendations[0].databaseId, (0, class_transformer_1.plainToClass)(database_recommendations_response_1.DatabaseRecommendationsResponse, {
                totalUnread,
                recommendations,
            }));
        }
        catch (e) {
            this.logger.error('Unable to prepare dto for recommendations', e);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.RecommendationEvents.NewRecommendation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DatabaseRecommendationEmitter.prototype, "newRecommendation", null);
DatabaseRecommendationEmitter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_recommendation_entity_1.DatabaseRecommendationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], DatabaseRecommendationEmitter);
exports.DatabaseRecommendationEmitter = DatabaseRecommendationEmitter;
