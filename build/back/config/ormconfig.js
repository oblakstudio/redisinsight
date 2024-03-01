"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormModuleOptions = void 0;
const server_entity_1 = require("../src/modules/server/entities/server.entity");
const command_execution_entity_1 = require("../src/modules/workbench/entities/command-execution.entity");
const plugin_state_entity_1 = require("../src/modules/workbench/entities/plugin-state.entity");
const notification_entity_1 = require("../src/modules/notification/entities/notification.entity");
const database_analysis_entity_1 = require("../src/modules/database-analysis/entities/database-analysis.entity");
const database_recommendation_entity_1 = require("../src/modules/database-recommendation/entities/database-recommendation.entity");
const typeorm_1 = require("typeorm");
const agreements_entity_1 = require("../src/modules/settings/entities/agreements.entity");
const settings_entity_1 = require("../src/modules/settings/entities/settings.entity");
const ca_certificate_entity_1 = require("../src/modules/certificate/entities/ca-certificate.entity");
const client_certificate_entity_1 = require("../src/modules/certificate/entities/client-certificate.entity");
const database_entity_1 = require("../src/modules/database/entities/database.entity");
const ssh_options_entity_1 = require("../src/modules/ssh/entities/ssh-options.entity");
const browser_history_entity_1 = require("../src/modules/browser/browser-history/entities/browser-history.entity");
const custom_tutorial_entity_1 = require("../src/modules/custom-tutorial/entities/custom-tutorial.entity");
const feature_entity_1 = require("../src/modules/feature/entities/feature.entity");
const features_config_entity_1 = require("../src/modules/feature/entities/features-config.entity");
const cloud_database_details_entity_1 = require("../src/modules/cloud/database/entities/cloud-database-details.entity");
const cloud_capi_key_entity_1 = require("../src/modules/cloud/capi-key/entity/cloud-capi-key.entity");
const migration_1 = require("../migration");
const config = require("../src/utils/config");
const dbConfig = config.get('db');
const ormConfig = {
    type: 'sqlite',
    database: dbConfig.database,
    synchronize: dbConfig.synchronize,
    migrationsRun: dbConfig.migrationsRun,
    entities: [
        agreements_entity_1.AgreementsEntity,
        ca_certificate_entity_1.CaCertificateEntity,
        client_certificate_entity_1.ClientCertificateEntity,
        database_entity_1.DatabaseEntity,
        server_entity_1.ServerEntity,
        settings_entity_1.SettingsEntity,
        command_execution_entity_1.CommandExecutionEntity,
        plugin_state_entity_1.PluginStateEntity,
        notification_entity_1.NotificationEntity,
        database_analysis_entity_1.DatabaseAnalysisEntity,
        database_recommendation_entity_1.DatabaseRecommendationEntity,
        browser_history_entity_1.BrowserHistoryEntity,
        ssh_options_entity_1.SshOptionsEntity,
        custom_tutorial_entity_1.CustomTutorialEntity,
        feature_entity_1.FeatureEntity,
        features_config_entity_1.FeaturesConfigEntity,
        cloud_database_details_entity_1.CloudDatabaseDetailsEntity,
        cloud_capi_key_entity_1.CloudCapiKeyEntity,
    ],
    migrations: migration_1.default,
};
exports.ormModuleOptions = ormConfig;
exports.default = new typeorm_1.DataSource({ ...ormConfig, type: 'sqlite' });
