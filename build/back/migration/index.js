"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1614164490968_initial_migration_1 = require("./1614164490968-initial-migration");
const _1615480887019_connection_type_1 = require("./1615480887019-connection-type");
const _1615990079125_database_name_from_provider_1 = require("./1615990079125-database-name-from-provider");
const _1615992183565_remove_database_type_1 = require("./1615992183565-remove-database-type");
const _1616520395940_oss_sentinel_1 = require("./1616520395940-oss-sentinel");
const _1625771635418_agreements_1 = require("./1625771635418-agreements");
const _1626086601057_server_info_1 = require("./1626086601057-server-info");
const _1626904405170_database_hosting_provider_1 = require("./1626904405170-database-hosting-provider");
const _1627556171227_settings_1 = require("./1627556171227-settings");
const _1629729923740_database_modules_1 = require("./1629729923740-database-modules");
const _1634219846022_database_db_index_1 = require("./1634219846022-database-db-index");
const _1634557312500_encryption_1 = require("./1634557312500-encryption");
const _1641795882696_command_execution_1 = require("./1641795882696-command-execution");
const _1641805606399_plugin_state_1 = require("./1641805606399-plugin-state");
const _1650278664000_sni_1 = require("./1650278664000-sni");
const _1655821010349_notification_1 = require("./1655821010349-notification");
const _1659687030433_notification_category_1 = require("./1659687030433-notification-category");
const _1660664717573_workbench_mode_1 = require("./1660664717573-workbench-mode");
const _1663093411715_workbench_group_mode_1 = require("./1663093411715-workbench-group-mode");
const _1664785208236_database_analysis_1 = require("./1664785208236-database-analysis");
const _1664886479051_database_analysis_expiration_groups_1 = require("./1664886479051-database-analysis-expiration-groups");
const _1667368983699_workbench_execution_time_1 = require("./1667368983699-workbench-execution-time");
const _1667477693934_database_1 = require("./1667477693934-database");
const _1670252337342_database_new_1 = require("./1670252337342-database-new");
const _1673035852335_ssh_options_1 = require("./1673035852335-ssh-options");
const _1673934231410_workbench_and_analysis_db_1 = require("./1673934231410-workbench-and-analysis-db");
const _1674539211397_browser_history_1 = require("./1674539211397-browser-history");
const _1674660306971_database_analysis_recommendations_1 = require("./1674660306971-database-analysis-recommendations");
const _1675398140189_database_timeout_1 = require("./1675398140189-database-timeout");
const _1678182722874_database_compressor_1 = require("./1678182722874-database-compressor");
const _1677135091633_custom_tutorials_1 = require("./1677135091633-custom-tutorials");
const _1681900503586_database_recommendations_1 = require("./1681900503586-database-recommendations");
const _1683006064293_database_recommendation_params_1 = require("./1683006064293-database-recommendation-params");
const _1684931530343_feature_1 = require("./1684931530343-feature");
const _1686719451753_database_redis_server_1 = require("./1686719451753-database-redis-server");
const _1687435940110_database_recommendation_unique_1 = require("./1687435940110-database-recommendation-unique");
const _1687166457712_cloud_database_details_1 = require("./1687166457712-cloud-database-details");
const _1688989337247_freeCloudDatabase_1 = require("./1688989337247-freeCloudDatabase");
const _1691061058385_cloud_capi_keys_1 = require("./1691061058385-cloud-capi-keys");
const _1691476419592_feature_sso_1 = require("./1691476419592-feature-sso");
exports.default = [
    _1614164490968_initial_migration_1.initialMigration1614164490968,
    _1615480887019_connection_type_1.connectionType1615480887019,
    _1615990079125_database_name_from_provider_1.databaseNameFromProvider1615990079125,
    _1615992183565_remove_database_type_1.removeDatabaseType1615992183565,
    _1616520395940_oss_sentinel_1.ossSentinel1616520395940,
    _1625771635418_agreements_1.agreements1625771635418,
    _1626086601057_server_info_1.serverInfo1626086601057,
    _1626904405170_database_hosting_provider_1.databaseHostingProvider1626904405170,
    _1627556171227_settings_1.settings1627556171227,
    _1629729923740_database_modules_1.databaseModules1629729923740,
    _1634219846022_database_db_index_1.databaseDbIndex1634219846022,
    _1634557312500_encryption_1.encryption1634557312500,
    _1641795882696_command_execution_1.commandExecution1641795882696,
    _1641805606399_plugin_state_1.pluginState1641805606399,
    _1650278664000_sni_1.sni1650278664000,
    _1655821010349_notification_1.notification1655821010349,
    _1659687030433_notification_category_1.notificationCategory1659687030433,
    _1660664717573_workbench_mode_1.workbenchMode1660664717573,
    _1663093411715_workbench_group_mode_1.workbenchGroupMode1663093411715,
    _1664785208236_database_analysis_1.databaseAnalysis1664785208236,
    _1664886479051_database_analysis_expiration_groups_1.databaseAnalysisExpirationGroups1664886479051,
    _1667368983699_workbench_execution_time_1.workbenchExecutionTime1667368983699,
    _1667477693934_database_1.database1667477693934,
    _1670252337342_database_new_1.databaseNew1670252337342,
    _1673035852335_ssh_options_1.sshOptions1673035852335,
    _1673934231410_workbench_and_analysis_db_1.workbenchAndAnalysisDbIndex1673934231410,
    _1674660306971_database_analysis_recommendations_1.databaseAnalysisRecommendations1674660306971,
    _1674539211397_browser_history_1.browserHistory1674539211397,
    _1675398140189_database_timeout_1.databaseTimeout1675398140189,
    _1678182722874_database_compressor_1.databaseCompressor1678182722874,
    _1677135091633_custom_tutorials_1.customTutorials1677135091633,
    _1681900503586_database_recommendations_1.databaseRecommendations1681900503586,
    _1683006064293_database_recommendation_params_1.databaseRecommendationParams1683006064293,
    _1684931530343_feature_1.Feature1684931530343,
    _1686719451753_database_redis_server_1.DatabaseRedisServer1686719451753,
    _1687435940110_database_recommendation_unique_1.DatabaseRecommendationUnique1687435940110,
    _1687166457712_cloud_database_details_1.CloudDatabaseDetails1687166457712,
    _1688989337247_freeCloudDatabase_1.FreeCloudDatabase1688989337247,
    _1691061058385_cloud_capi_keys_1.CloudCapiKeys1691061058385,
    _1691476419592_feature_sso_1.FeatureSso1691476419592,
];
