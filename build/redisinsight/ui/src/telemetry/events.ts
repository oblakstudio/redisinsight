/* eslint-disable max-len */
export enum TelemetryEvent {
  APPLICATION_UPDATED = 'APPLICATION_UPDATED',
  CONSENT_MENU_VIEWED = 'CONSENT_MENU_VIEWED',

  CONFIG_DATABASES_SINGLE_DATABASE_DELETE_CLICKED = 'CONFIG_DATABASES_SINGLE_DATABASE_DELETE_CLICKED',
  CONFIG_DATABASES_MULTIPLE_DATABASES_DELETE_CLICKED = 'CONFIG_DATABASES_MULTIPLE_DATABASES_DELETE_CLICKED',
  CONFIG_DATABASES_DATABASE_EDIT_CLICKED = 'CONFIG_DATABASES_DATABASE_EDIT_CLICKED',
  CONFIG_DATABASES_DATABASE_EDIT_CANCELLED_CLICKED = 'CONFIG_DATABASES_DATABASE_EDIT_CANCELLED_CLICKED',
  CONFIG_DATABASES_DATABASE_LIST_SORTED = 'CONFIG_DATABASES_DATABASE_LIST_SORTED',
  CONFIG_DATABASES_OPEN_DATABASE_BUTTON_CLICKED = 'CONFIG_DATABASES_OPEN_DATABASE_BUTTON_CLICKED',
  CONFIG_DATABASES_DATABASE_LIST_SEARCHED = 'CONFIG_DATABASES_DATABASE_LIST_SEARCHED',

  CONFIG_DATABASES_HOST_PORT_COPIED = 'CONFIG_DATABASES_HOST_PORT_COPIED',
  CONFIG_DATABASES_ADD_FORM_DISMISSED = 'CONFIG_DATABASES_ADD_FORM_DISMISSED',
  CONFIG_DATABASES_OPEN_DATABASE = 'CONFIG_DATABASES_OPEN_DATABASE',
  CONFIG_DATABASES_CLICKED = 'CONFIG_DATABASES_CLICKED',
  CONFIG_DATABASES_MANUALLY_SUBMITTED = 'CONFIG_DATABASES_MANUALLY_SUBMITTED',
  CONFIG_DATABASES_RE_CLUSTER_AUTODISCOVERY_SUBMITTED = 'CONFIG_DATABASES_RE_CLUSTER_AUTODISCOVERY_SUBMITTED',
  CONFIG_DATABASES_RE_CLUSTER_AUTODISCOVERY_CANCELLED = 'CONFIG_DATABASES_RE_CLUSTER_AUTODISCOVERY_CANCELLED',
  CONFIG_DATABASES_RE_CLOUD_AUTODISCOVERY_SUBMITTED = 'CONFIG_DATABASES_RE_CLOUD_AUTODISCOVERY_SUBMITTED',
  CONFIG_DATABASES_RE_CLOUD_AUTODISCOVERY_CANCELLED = 'CONFIG_DATABASES_RE_CLOUD_AUTODISCOVERY_CANCELLED',
  CONFIG_DATABASES_REDIS_SENTINEL_AUTODISCOVERY_SUBMITTED = 'CONFIG_DATABASES_REDIS_SENTINEL_AUTODISCOVERY_SUBMITTED',
  CONFIG_DATABASES_REDIS_SENTINEL_AUTODISCOVERY_CANCELLED = 'CONFIG_DATABASES_REDIS_SENTINEL_AUTODISCOVERY_CANCELLED',
  CONFIG_DATABASES_GET_REDIS_CLOUD_ACCOUNT_CLICKED = 'CONFIG_DATABASES_GET_REDIS_CLOUD_ACCOUNT_CLICKED',
  CREATE_FREE_CLOUD_DATABASE_CLICKED = 'CREATE_FREE_CLOUD_DATABASE_CLICKED',
  CONFIG_DATABASES_DATABASE_CLONE_REQUESTED = 'CONFIG_DATABASES_DATABASE_CLONE_REQUESTED',
  CONFIG_DATABASES_DATABASE_CLONE_CANCELLED = 'CONFIG_DATABASES_DATABASE_CLONE_CANCELLED',
  CONFIG_DATABASES_DATABASE_CLONE_CONFIRMED = 'CONFIG_DATABASES_DATABASE_CLONE_CONFIRMED',
  CONFIG_DATABASES_REDIS_IMPORT_SUBMITTED = 'CONFIG_DATABASES_REDIS_IMPORT_SUBMITTED',
  CONFIG_DATABASES_REDIS_IMPORT_CANCELLED = 'CONFIG_DATABASES_REDIS_IMPORT_CANCELLED',
  CONFIG_DATABASES_REDIS_IMPORT_CLICKED = 'CONFIG_DATABASES_REDIS_IMPORT_CLICKED',
  CONFIG_DATABASES_REDIS_EXPORT_CLICKED = 'CONFIG_DATABASES_REDIS_EXPORT_CLICKED',
  CONFIG_DATABASES_REDIS_EXPORT_SUCCEEDED = 'CONFIG_DATABASES_REDIS_EXPORT_SUCCEEDED',
  CONFIG_DATABASES_REDIS_EXPORT_FAILED = 'CONFIG_DATABASES_REDIS_EXPORT_FAILED',
  CONFIG_DATABASES_REDIS_IMPORT_LOG_VIEWED = 'CONFIG_DATABASES_REDIS_IMPORT_LOG_VIEWED',
  CONFIG_DATABASES_TEST_CONNECTION_CLICKED = 'CONFIG_DATABASES_TEST_CONNECTION_CLICKED',

  BUILD_FROM_SOURCE_CLICKED = 'BUILD_FROM_SOURCE_CLICKED',
  BUILD_USING_DOCKER_CLICKED = 'BUILD_USING_DOCKER_CLICKED',
  BUILD_USING_HOMEBREW_CLICKED = 'BUILD_USING_HOMEBREW_CLICKED',

  BROWSER_KEY_ADD_BUTTON_CLICKED = 'BROWSER_KEY_ADD_BUTTON_CLICKED',
  BROWSER_KEY_BULK_ACTIONS_BUTTON_CLICKED = 'BROWSER_KEY_BULK_ACTIONS_BUTTON_CLICKED',
  BROWSER_KEY_ADD_CANCELLED = 'BROWSER_KEY_ADD_CANCELLED',
  BROWSER_KEY_DELETE_CLICKED = 'BROWSER_KEY_DELETE_CLICKED',
  BROWSER_KEY_LIST_REFRESH_CLICKED = 'BROWSER_KEY_LIST_REFRESH_CLICKED',
  BROWSER_KEY_DETAILS_REFRESH_CLICKED = 'BROWSER_KEY_DETAILS_REFRESH_CLICKED',
  BROWSER_KEY_VALUE_REMOVE_CLICKED = 'BROWSER_KEY_VALUE_REMOVE_CLICKED',
  BROWSER_KEY_ADD_VALUE_CLICKED = 'BROWSER_KEY_ADD_VALUE_CLICKED',
  BROWSER_KEY_ADD_VALUE_CANCELLED = 'BROWSER_KEY_ADD_VALUE_CANCELLED',
  BROWSER_KEY_COPIED = 'BROWSER_KEY_COPIED',
  BROWSER_JSON_KEY_EXPANDED = 'BROWSER_JSON_KEY_EXPANDED',
  BROWSER_JSON_KEY_COLLAPSED = 'BROWSER_JSON_KEY_COLLAPSED',
  BROWSER_KEY_ADDED = 'BROWSER_KEY_ADDED',
  BROWSER_KEY_VALUE_FILTERED = 'BROWSER_KEY_VALUE_FILTERED',
  BROWSER_KEY_TTL_CHANGED = 'BROWSER_KEY_TTL_CHANGED',
  BROWSER_KEY_VALUE_ADDED = 'BROWSER_KEY_VALUE_ADDED',
  BROWSER_KEY_VALUE_REMOVED = 'BROWSER_KEY_VALUE_REMOVED',
  BROWSER_KEY_VALUE_EDITED = 'BROWSER_KEY_VALUE_EDITED',
  BROWSER_KEYS_DELETED = 'BROWSER_KEYS_DELETED',
  BROWSER_JSON_PROPERTY_EDITED = 'BROWSER_JSON_PROPERTY_EDITED',
  BROWSER_JSON_PROPERTY_DELETED = 'BROWSER_JSON_PROPERTY_DELETED',
  BROWSER_JSON_PROPERTY_ADDED = 'BROWSER_JSON_PROPERTY_ADDED',
  BROWSER_JSON_VALUE_IMPORT_CLICKED = 'BROWSER_JSON_VALUE_IMPORT_CLICKED',
  BROWSER_KEYS_SCANNED = 'BROWSER_KEYS_SCANNED',
  BROWSER_KEYS_ADDITIONALLY_SCANNED = 'BROWSER_KEYS_ADDITIONALLY_SCANNED',
  BROWSER_KEYS_SCANNED_WITH_FILTER_ENABLED = 'BROWSER_KEYS_SCANNED_WITH_FILTER_ENABLED',
  BROWSER_KEY_LIST_AUTO_REFRESH_ENABLED = 'BROWSER_KEY_LIST_AUTO_REFRESH_ENABLED',
  BROWSER_KEY_LIST_AUTO_REFRESH_DISABLED = 'BROWSER_KEY_LIST_AUTO_REFRESH_DISABLED',
  BROWSER_KEY_DETAILS_AUTO_REFRESH_ENABLED = 'BROWSER_KEY_DETAILS_AUTO_REFRESH_ENABLED',
  BROWSER_KEY_DETAILS_AUTO_REFRESH_DISABLED = 'BROWSER_KEY_DETAILS_AUTO_REFRESH_DISABLED',
  BROWSER_KEY_VALUE_VIEWED = 'BROWSER_KEY_VALUE_VIEWED',
  BROWSER_KEY_DETAILS_FULL_SCREEN_ENABLED = 'BROWSER_KEY_DETAILS_FULL_SCREEN_ENABLED',
  BROWSER_KEY_DETAILS_FULL_SCREEN_DISABLED = 'BROWSER_KEY_DETAILS_FULL_SCREEN_DISABLED',
  BROWSER_KEY_FIELD_VALUE_EXPANDED = 'BROWSER_KEY_FIELD_VALUE_EXPANDED',
  BROWSER_KEY_FIELD_VALUE_COLLAPSED = 'BROWSER_KEY_FIELD_VALUE_COLLAPSED',
  BROWSER_KEY_DETAILS_FORMATTER_CHANGED = 'BROWSER_KEY_DETAILS_FORMATTER_CHANGED',
  BROWSER_WORKBENCH_LINK_CLICKED = 'BROWSER_WORKBENCH_LINK_CLICKED',
  BROWSER_DATABASE_INDEX_CHANGED = 'BROWSER_DATABASE_INDEX_CHANGED',
  BROWSER_FILTER_MODE_CHANGE_FAILED = 'BROWSER_FILTER_MODE_CHANGE_FAILED',

  CLI_OPENED = 'CLI_OPENED',
  CLI_CLOSED = 'CLI_CLOSED',
  CLI_MINIMIZED = 'CLI_MINIMIZED',
  CLI_COMMAND_SUBMITTED = 'CLI_COMMAND_SUBMITTED',
  CLI_WORKBENCH_LINK_CLICKED = 'CLI_WORKBENCH_LINK_CLICKED',
  COMMAND_HELPER_OPENED = 'COMMAND_HELPER_OPENED',
  COMMAND_HELPER_CLOSED = 'COMMAND_HELPER_CLOSED',
  COMMAND_HELPER_MINIMIZED = 'COMMAND_HELPER_MINIMIZED',
  COMMAND_HELPER_INFO_DISPLAYED_FOR_CLI_INPUT = 'COMMAND_HELPER_INFO_DISPLAYED_FOR_CLI_INPUT',
  COMMAND_HELPER_COMMAND_FILTERED = 'COMMAND_HELPER_COMMAND_FILTERED',
  COMMAND_HELPER_COMMAND_OPENED = 'COMMAND_HELPER_COMMAND_OPENED',

  SETTINGS_COLOR_THEME_CHANGED = 'SETTINGS_COLOR_THEME_CHANGED',
  SETTINGS_NOTIFICATION_MESSAGES_ENABLED = 'SETTINGS_NOTIFICATION_MESSAGES_ENABLED',
  SETTINGS_NOTIFICATION_MESSAGES_DISABLED = 'SETTINGS_NOTIFICATION_MESSAGES_DISABLED',
  SETTINGS_WORKBENCH_EDITOR_CLEAR_CHANGED = 'SETTINGS_WORKBENCH_EDITOR_CLEAR_CHANGED',

  WORKBENCH_ENABLEMENT_AREA_GUIDE_OPENED = 'WORKBENCH_ENABLEMENT_AREA_GUIDE_OPENED',
  WORKBENCH_ENABLEMENT_AREA_COMMAND_CLICKED = 'WORKBENCH_ENABLEMENT_AREA_COMMAND_CLICKED',
  WORKBENCH_ENABLEMENT_AREA_LINK_CLICKED = 'WORKBENCH_ENABLEMENT_AREA_LINK_CLICKED',
  WORKBENCH_COMMAND_SUBMITTED = 'WORKBENCH_COMMAND_SUBMITTED',

  WORKBENCH_COMMAND_COPIED = 'WORKBENCH_COMMAND_COPIED',
  WORKBENCH_COMMAND_RUN_AGAIN = 'WORKBENCH_COMMAND_RUN_AGAIN',
  WORKBENCH_COMMAND_PROFILE = 'WORKBENCH_COMMAND_PROFILE',
  WORKBENCH_COMMAND_DELETE_COMMAND = 'WORKBENCH_COMMAND_DELETE_COMMAND',
  WORKBENCH_RESULTS_IN_FULL_SCREEN = 'WORKBENCH_RESULTS_IN_FULL_SCREEN',
  WORKBENCH_RESULTS_COLLAPSED = 'WORKBENCH_RESULTS_COLLAPSED',
  WORKBENCH_RESULTS_EXPANDED = 'WORKBENCH_RESULTS_EXPANDED',
  WORKBENCH_RESULT_VIEW_CHANGED = 'WORKBENCH_RESULT_VIEW_CHANGED',
  WORKBENCH_NON_REDIS_EDITOR_OPENED = 'WORKBENCH_NON_REDIS_EDITOR_OPENED',
  WORKBENCH_NON_REDIS_EDITOR_CANCELLED = 'WORKBENCH_NON_REDIS_EDITOR_CANCELLED',
  WORKBENCH_NON_REDIS_EDITOR_SAVED = 'WORKBENCH_NON_REDIS_EDITOR_SAVED',
  WORKBENCH_MODE_CHANGED = 'WORKBENCH_MODE_CHANGED',
  WORKBENCH_ENABLEMENT_AREA_IMPORT_CLICKED = 'WORKBENCH_ENABLEMENT_AREA_IMPORT_CLICKED',
  WORKBENCH_ENABLEMENT_AREA_IMPORT_SUBMITTED = 'WORKBENCH_ENABLEMENT_AREA_IMPORT_SUBMITTED',
  WORKBENCH_ENABLEMENT_AREA_TUTORIAL_LINK_CHANGED = 'WORKBENCH_ENABLEMENT_AREA_TUTORIAL_LINK_CHANGED',
  WORKBENCH_ENABLEMENT_AREA_TUTORIAL_DELETED = 'WORKBENCH_ENABLEMENT_AREA_TUTORIAL_DELETED',
  WORKBENCH_ENABLEMENT_AREA_TUTORIAL_INFO_CLICKED = 'WORKBENCH_ENABLEMENT_AREA_TUTORIAL_INFO_CLICKED',
  WORKBENCH_ENABLEMENT_AREA_DATA_UPLOAD_CLICKED = 'WORKBENCH_ENABLEMENT_AREA_DATA_UPLOAD_CLICKED',
  WORKBENCH_ENABLEMENT_AREA_DATA_UPLOAD_SUBMITTED = 'WORKBENCH_ENABLEMENT_AREA_DATA_UPLOAD_SUBMITTED',

  PROFILER_OPENED = 'PROFILER_OPENED',
  PROFILER_STARTED = 'PROFILER_STARTED',
  PROFILER_STOPPED = 'PROFILER_STOPPED',
  PROFILER_PAUSED = 'PROFILER_PAUSED',
  PROFILER_RESUMED = 'PROFILER_RESUMED',
  PROFILER_CLEARED = 'PROFILER_CLEARED',
  PROFILER_CLOSED = 'PROFILER_CLOSED',
  PROFILER_MINIMIZED = 'PROFILER_MINIMIZED',

  TREE_VIEW_OPENED = 'TREE_VIEW_OPENED',
  TREE_VIEW_KEY_ADD_BUTTON_CLICKED = 'TREE_VIEW_KEY_ADD_BUTTON_CLICKED',
  TREE_VIEW_KEY_BULK_ACTIONS_BUTTON_CLICKED = 'TREE_VIEW_KEY_BULK_ACTIONS_BUTTON_CLICKED',
  TREE_VIEW_KEY_ADD_CANCELLED = 'TREE_VIEW_KEY_ADD_CANCELLED',
  TREE_VIEW_KEY_VALUE_FILTERED = 'TREE_VIEW_KEY_VALUE_FILTERED',
  TREE_VIEW_KEY_TTL_CHANGED = 'TREE_VIEW_KEY_TTL_CHANGED',
  TREE_VIEW_KEY_ADD_VALUE_CLICKED = 'TREE_VIEW_KEY_ADD_VALUE_CLICKED',
  TREE_VIEW_KEY_ADD_VALUE_CANCELLED = 'TREE_VIEW_KEY_ADD_VALUE_CANCELLED',
  TREE_VIEW_KEY_VALUE_ADDED = 'TREE_VIEW_KEY_VALUE_ADDED',
  TREE_VIEW_KEY_VALUE_REMOVE_CLICKED = 'TREE_VIEW_KEY_VALUE_REMOVE_CLICKED',
  TREE_VIEW_KEY_DELETE_CLICKED = 'TREE_VIEW_KEY_DELETE_CLICKED',
  TREE_VIEW_KEY_LIST_REFRESH_CLICKED = 'TREE_VIEW_KEY_LIST_REFRESH_CLICKED',
  TREE_VIEW_KEY_DETAILS_REFRESH_CLICKED = 'TREE_VIEW_KEY_DETAILS_REFRESH_CLICKED',
  TREE_VIEW_KEY_VALUE_REMOVED = 'TREE_VIEW_KEY_VALUE_REMOVED',
  TREE_VIEW_KEY_VALUE_EDITED = 'TREE_VIEW_KEY_VALUE_EDITED',
  TREE_VIEW_KEYS_DELETED = 'TREE_VIEW_KEYS_DELETED',
  TREE_VIEW_KEY_COPIED = 'TREE_VIEW_KEY_COPIED',
  TREE_VIEW_JSON_KEY_EXPANDED = 'TREE_VIEW_JSON_KEY_EXPANDED',
  TREE_VIEW_JSON_KEY_COLLAPSED = 'TREE_VIEW_JSON_KEY_COLLAPSED',
  TREE_VIEW_JSON_PROPERTY_EDITED = 'TREE_VIEW_JSON_PROPERTY_EDITED',
  TREE_VIEW_JSON_PROPERTY_DELETED = 'TREE_VIEW_JSON_PROPERTY_DELETED',
  TREE_VIEW_JSON_PROPERTY_ADDED = 'TREE_VIEW_JSON_PROPERTY_ADDED',
  TREE_VIEW_KEYS_SCANNED_WITH_FILTER_ENABLED = 'TREE_VIEW_KEYS_SCANNED_WITH_FILTER_ENABLED',
  TREE_VIEW_KEYS_SCANNED = 'TREE_VIEW_KEYS_SCANNED',
  TREE_VIEW_KEYS_ADDITIONALLY_SCANNED = 'TREE_VIEW_KEYS_ADDITIONALLY_SCANNED',
  TREE_VIEW_DELIMITER_CHANGED = 'TREE_VIEW_DELIMITER_CHANGED',
  TREE_VIEW_KEY_ADDED = 'TREE_VIEW_KEY_ADDED',
  TREE_VIEW_KEY_LIST_AUTO_REFRESH_ENABLED = 'TREE_VIEW_KEY_LIST_AUTO_REFRESH_ENABLED',
  TREE_VIEW_KEY_LIST_AUTO_REFRESH_DISABLED = 'TREE_VIEW_KEY_LIST_AUTO_REFRESH_DISABLED',
  TREE_VIEW_KEY_DETAILS_AUTO_REFRESH_ENABLED = 'TREE_VIEW_KEY_DETAILS_AUTO_REFRESH_ENABLED',
  TREE_VIEW_KEY_DETAILS_AUTO_REFRESH_DISABLED = 'TREE_VIEW_KEY_DETAILS_AUTO_REFRESH_DISABLED',
  TREE_VIEW_KEY_VALUE_VIEWED = 'TREE_VIEW_KEY_VALUE_VIEWED',
  TREE_VIEW_KEY_DETAILS_FULL_SCREEN_ENABLED = 'TREE_VIEW_KEY_DETAILS_FULL_SCREEN_ENABLED',
  TREE_VIEW_KEY_DETAILS_FULL_SCREEN_DISABLED = 'TREE_VIEW_KEY_DETAILS_FULL_SCREEN_DISABLED',
  TREE_VIEW_KEY_FIELD_VALUE_EXPANDED = 'TREE_VIEW_KEY_FIELD_VALUE_EXPANDED',
  TREE_VIEW_KEY_FIELD_VALUE_COLLAPSED = 'TREE_VIEW_KEY_FIELD_VALUE_COLLAPSED',
  TREE_VIEW_KEY_DETAILS_FORMATTER_CHANGED = 'TREE_VIEW_KEY_DETAILS_FORMATTER_CHANGED',
  TREE_VIEW_WORKBENCH_LINK_CLICKED = 'TREE_VIEW_WORKBENCH_LINK_CLICKED',

  SLOWLOG_LOADED = 'SLOWLOG_LOADED',
  SLOWLOG_CLEARED = 'SLOWLOG_CLEARED',
  SLOWLOG_SET_LOG_SLOWER_THAN = 'SLOWLOG_SET_LOG_SLOWER_THAN',
  SLOWLOG_SET_MAX_LEN = 'SLOWLOG_SET_MAX_LEN',
  SLOWLOG_SORTED = 'SLOWLOG_SORTED',
  SLOWLOG_AUTO_REFRESH_ENABLED = 'SLOWLOG_AUTO_REFRESH_ENABLED',
  SLOWLOG_AUTO_REFRESH_DISABLED = 'SLOWLOG_AUTO_REFRESH_DISABLED',

  STREAM_DATA_FILTERED = 'STREAM_DATA_FILTERED',
  STREAM_DATA_FILTER_RESET = 'STREAM_DATA_FILTER_RESET',
  STREAM_CONSUMER_GROUPS_LOADED = 'STREAM_CONSUMER_GROUPS_LOADED',
  STREAM_CONSUMER_GROUP_CREATED = 'STREAM_CONSUMER_GROUP_CREATED',
  STREAM_CONSUMER_GROUP_DELETED = 'STREAM_CONSUMER_GROUP_DELETED',
  STREAM_CONSUMER_GROUP_ID_SET = 'STREAM_CONSUMER_GROUP_ID_SET',
  STREAM_CONSUMERS_LOADED = 'STREAM_CONSUMERS_LOADED',
  STREAM_CONSUMER_MESSAGE_ACKNOWLEDGED = 'STREAM_CONSUMER_MESSAGE_ACKNOWLEDGED',
  STREAM_CONSUMER_MESSAGE_CLAIMED = 'STREAM_CONSUMER_MESSAGE_CLAIMED',
  STREAM_CONSUMER_MESSAGE_CLAIM_CANCELED = 'STREAM_CONSUMER_MESSAGE_CLAIM_CANCELED',
  STREAM_CONSUMER_DELETED = 'STREAM_CONSUMER_DELETED',

  PUBSUB_MESSAGES_CLEARED = 'PUBSUB_MESSAGES_CLEARED',
  PUBSUB_AUTOSCROLL_PAUSED = 'PUBSUB_AUTOSCROLL_PAUSED',
  PUBSUB_AUTOSCROLL_RESUMED = 'PUBSUB_AUTOSCROLL_RESUMED',

  NOTIFICATIONS_HISTORY_OPENED = 'NOTIFICATIONS_HISTORY_OPENED',
  NOTIFICATIONS_MESSAGE_CLOSED = 'NOTIFICATIONS_MESSAGE_CLOSED',

  BULK_ACTIONS_OPENED = 'BULK_ACTIONS_OPENED',
  BULK_ACTIONS_WARNING = 'BULK_ACTIONS_WARNING',
  BULK_ACTIONS_CANCELLED = 'BULK_ACTIONS_CANCELLED',

  DATABASE_ANALYSIS_STARTED = 'DATABASE_ANALYSIS_STARTED',
  DATABASE_ANALYSIS_HISTORY_VIEWED = 'DATABASE_ANALYSIS_HISTORY_VIEWED',
  DATABASE_ANALYSIS_EXTRAPOLATION_CHANGED = 'DATABASE_ANALYSIS_EXTRAPOLATION_CHANGED',
  DATABASE_ANALYSIS_RECOMMENDATIONS_CLICKED = 'DATABASE_ANALYSIS_RECOMMENDATIONS_CLICKED',
  DATABASE_ANALYSIS_DATA_SUMMARY_CLICKED = 'DATABASE_ANALYSIS_DATA_SUMMARY_CLICKED',
  DATABASE_ANALYSIS_RECOMMENDATIONS_EXPANDED = 'DATABASE_ANALYSIS_RECOMMENDATIONS_EXPANDED',
  DATABASE_ANALYSIS_RECOMMENDATIONS_COLLAPSED = 'DATABASE_ANALYSIS_RECOMMENDATIONS_COLLAPSED',
  DATABASE_ANALYSIS_RECOMMENDATIONS_VOTED = 'DATABASE_ANALYSIS_RECOMMENDATIONS_VOTED',
  DATABASE_RECOMMENDATIONS_TUTORIAL_CLICKED = 'DATABASE_RECOMMENDATIONS_TUTORIAL_CLICKED',
  DATABASE_RECOMMENDATIONS_KEY_COPIED = 'DATABASE_RECOMMENDATIONS_KEY_COPIED',

  USER_SURVEY_LINK_CLICKED = 'USER_SURVEY_LINK_CLICKED',

  SEARCH_MODE_CHANGED = 'SEARCH_MODE_CHANGED',
  SEARCH_MODE_CHANGE_FAILED = 'SEARCH_MODE_CHANGE_FAILED',
  SEARCH_INDEX_CHANGED = 'SEARCH_INDEX_CHANGED',
  SEARCH_INDEX_ADD_BUTTON_CLICKED = 'SEARCH_INDEX_ADD_BUTTON_CLICKED',
  SEARCH_INDEX_ADD_CANCELLED = 'SEARCH_INDEX_ADD_CANCELLED',
  SEARCH_KEYS_SEARCHED = 'SEARCH_KEYS_SEARCHED',
  SEARCH_INDEX_ADDED = 'SEARCH_INDEX_ADDED',
  ONBOARDING_TOUR_CLICKED = 'ONBOARDING_TOUR_CLICKED',
  ONBOARDING_TOUR_ACTION_MADE = 'ONBOARDING_TOUR_ACTION_MADE',
  ONBOARDING_TOUR_TRIGGERED = 'ONBOARDING_TOUR_TRIGGERED',
  ONBOARDING_TOUR_FINISHED = 'ONBOARDING_TOUR_FINISHED',

  RELEASE_NOTES_LINK_CLICKED = 'RELEASE_NOTES_LINK_CLICKED',

  INSIGHTS_PANEL_OPENED = 'INSIGHTS_PANEL_OPENED',
  INSIGHTS_PANEL_CLOSED = 'INSIGHTS_PANEL_CLOSED',
  INSIGHTS_RECOMMENDATION_TUTORIAL_CLICKED = 'INSIGHTS_RECOMMENDATION_TUTORIAL_CLICKED',
  INSIGHTS_RECOMMENDATION_VOTED = 'INSIGHTS_RECOMMENDATION_VOTED',
  INSIGHTS_RECOMMENDATION_SNOOZED = 'INSIGHTS_RECOMMENDATION_SNOOZED',
  INSIGHTS_RECOMMENDATION_HIDE = 'INSIGHTS_RECOMMENDATION_HIDE',
  INSIGHTS_RECOMMENDATION_SHOW_HIDDEN = 'INSIGHTS_RECOMMENDATION_SHOW_HIDDEN',
  INSIGHTS_RECOMMENDATION_DATABASE_ANALYSIS_CLICKED = 'INSIGHTS_RECOMMENDATION_DATABASE_ANALYSIS_CLICKED',
  INSIGHTS_RECOMMENDATION_KEY_COPIED = 'INSIGHTS_RECOMMENDATION_KEY_COPIED',
  INSIGHTS_RECOMMENDATION_LINK_CLICKED = 'INSIGHTS_RECOMMENDATION_LINK_CLICKED',

  TRIGGERS_AND_FUNCTIONS_LIBRARIES_SORTED = 'TRIGGERS_AND_FUNCTIONS_LIBRARIES_SORTED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_LIST_REFRESH_CLICKED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_LIST_REFRESH_CLICKED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_LIST_AUTO_REFRESH_ENABLED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_LIST_AUTO_REFRESH_ENABLED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_LIST_AUTO_REFRESH_DISABLED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_LIST_AUTO_REFRESH_DISABLED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_VIEWED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_VIEWED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_DETAILS_REFRESH_CLICKED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_DETAILS_REFRESH_CLICKED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_DETAILS_AUTO_REFRESH_ENABLED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_DETAILS_AUTO_REFRESH_ENABLED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_DETAILS_AUTO_REFRESH_DISABLED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_DETAILS_AUTO_REFRESH_DISABLED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_CODE_REPLACED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_CODE_REPLACED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_CONFIGURATION_REPLACED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_CONFIGURATION_REPLACED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_DELETE_CLICKED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_DELETE_CLICKED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_DELETED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_DELETED',
  TRIGGERS_AND_FUNCTIONS_LIBRARIES_CLICKED = 'TRIGGERS_AND_FUNCTIONS_LIBRARIES_CLICKED',
  TRIGGERS_AND_FUNCTIONS_FUNCTIONS_CLICKED = 'TRIGGERS_AND_FUNCTIONS_FUNCTIONS_CLICKED',
  TRIGGERS_AND_FUNCTIONS_FUNCTIONS_SORTED = 'TRIGGERS_AND_FUNCTIONS_FUNCTIONS_SORTED',
  TRIGGERS_AND_FUNCTIONS_FUNCTION_VIEWED = 'TRIGGERS_AND_FUNCTIONS_FUNCTION_VIEWED',
  TRIGGERS_AND_FUNCTIONS_FUNCTION_LIST_REFRESH_CLICKED = 'TRIGGERS_AND_FUNCTIONS_FUNCTION_LIST_REFRESH_CLICKED',
  TRIGGERS_AND_FUNCTIONS_FUNCTION_LIST_AUTO_REFRESH_ENABLED = 'TRIGGERS_AND_FUNCTIONS_FUNCTION_LIST_AUTO_REFRESH_ENABLED',
  TRIGGERS_AND_FUNCTIONS_FUNCTION_LIST_AUTO_REFRESH_DISABLED = 'TRIGGERS_AND_FUNCTIONS_FUNCTION_LIST_AUTO_REFRESH_DISABLED',
  TRIGGERS_AND_FUNCTIONS_LIBRARIES_RECEIVED = 'TRIGGERS_AND_FUNCTIONS_LIBRARIES_RECEIVED',
  TRIGGERS_AND_FUNCTIONS_FUNCTIONS_RECEIVED = 'TRIGGERS_AND_FUNCTIONS_FUNCTIONS_RECEIVED',
  TRIGGERS_AND_FUNCTIONS_LOAD_LIBRARY_CLICKED = 'TRIGGERS_AND_FUNCTIONS_LOAD_LIBRARY_CLICKED',
  TRIGGERS_AND_FUNCTIONS_LOAD_LIBRARY_CANCELLED = 'TRIGGERS_AND_FUNCTIONS_LOAD_LIBRARY_CANCELLED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_LOADED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_LOADED',
  TRIGGERS_AND_FUNCTIONS_LIBRARY_FAILED = 'TRIGGERS_AND_FUNCTIONS_LIBRARY_FAILED',
  TRIGGERS_AND_FUNCTIONS_FUNCTION_INVOKE_REQUESTED = 'TRIGGERS_AND_FUNCTIONS_FUNCTION_INVOKE_REQUESTED',
  TRIGGERS_AND_FUNCTIONS_FUNCTION_INVOKE_CLICKED = 'TRIGGERS_AND_FUNCTIONS_FUNCTION_INVOKE_CLICKED',
  TRIGGERS_AND_FUNCTIONS_FUNCTION_INVOKE_CANCELLED = 'TRIGGERS_AND_FUNCTIONS_FUNCTION_INVOKE_CANCELLED',
  TRIGGERS_AND_FUNCTIONS_FIND_KEY_CLICKED = 'TRIGGERS_AND_FUNCTIONS_FIND_KEY_CLICKED',
}