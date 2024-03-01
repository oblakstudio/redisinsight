"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const cli_module_1 = require("./modules/cli/cli.module");
const workbench_module_1 = require("./modules/workbench/workbench.module");
const slow_log_module_1 = require("./modules/slow-log/slow-log.module");
const pub_sub_module_1 = require("./modules/pub-sub/pub-sub.module");
const cluster_monitor_module_1 = require("./modules/cluster-monitor/cluster-monitor.module");
const database_analysis_module_1 = require("./modules/database-analysis/database-analysis.module");
const triggered_functions_module_1 = require("./modules/triggered-functions/triggered-functions.module");
const bulk_actions_module_1 = require("./modules/bulk-actions/bulk-actions.module");
const database_recommendation_module_1 = require("./modules/database-recommendation/database-recommendation.module");
exports.routes = [
    {
        path: '/databases',
        children: [
            {
                path: '/:dbInstance',
                module: cli_module_1.CliModule,
            },
            {
                path: '/:dbInstance',
                module: workbench_module_1.WorkbenchModule,
            },
            {
                path: '/:dbInstance',
                module: slow_log_module_1.SlowLogModule,
            },
            {
                path: '/:dbInstance',
                module: pub_sub_module_1.PubSubModule,
            },
            {
                path: '/:dbInstance',
                module: cluster_monitor_module_1.ClusterMonitorModule,
            },
            {
                path: '/:dbInstance',
                module: database_analysis_module_1.DatabaseAnalysisModule,
            },
            {
                path: '/:dbInstance',
                module: bulk_actions_module_1.BulkActionsModule,
            },
            {
                path: '/:dbInstance',
                module: database_recommendation_module_1.DatabaseRecommendationModule,
            },
            {
                path: '/:dbInstance',
                module: triggered_functions_module_1.TriggeredFunctionsModule,
            },
        ],
    },
];
