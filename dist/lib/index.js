"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata_update = exports.helpers_get_api = exports.helpers_get_access_token_from_environment = exports.file_delete = exports.file_add = exports.deposition_show_prereserved = exports.deposition_show_latest = exports.deposition_show_files = exports.deposition_show_draft = exports.deposition_show_details = exports.deposition_publish = exports.deposition_delete = exports.deposition_create_version = exports.deposition_create_concept = void 0;
var concept_1 = require("./deposition/create/concept");
Object.defineProperty(exports, "deposition_create_concept", { enumerable: true, get: function () { return concept_1.deposition_create_concept; } });
var version_1 = require("./deposition/create/version");
Object.defineProperty(exports, "deposition_create_version", { enumerable: true, get: function () { return version_1.deposition_create_version; } });
var delete_1 = require("./deposition/delete");
Object.defineProperty(exports, "deposition_delete", { enumerable: true, get: function () { return delete_1.deposition_delete; } });
var publish_1 = require("./deposition/publish");
Object.defineProperty(exports, "deposition_publish", { enumerable: true, get: function () { return publish_1.deposition_publish; } });
var details_1 = require("./deposition/show/details");
Object.defineProperty(exports, "deposition_show_details", { enumerable: true, get: function () { return details_1.deposition_show_details; } });
var draft_1 = require("./deposition/show/draft");
Object.defineProperty(exports, "deposition_show_draft", { enumerable: true, get: function () { return draft_1.deposition_show_draft; } });
var files_1 = require("./deposition/show/files");
Object.defineProperty(exports, "deposition_show_files", { enumerable: true, get: function () { return files_1.deposition_show_files; } });
var latest_1 = require("./deposition/show/latest");
Object.defineProperty(exports, "deposition_show_latest", { enumerable: true, get: function () { return latest_1.deposition_show_latest; } });
var prereserved_1 = require("./deposition/show/prereserved");
Object.defineProperty(exports, "deposition_show_prereserved", { enumerable: true, get: function () { return prereserved_1.deposition_show_prereserved; } });
var add_1 = require("./file/add");
Object.defineProperty(exports, "file_add", { enumerable: true, get: function () { return add_1.file_add; } });
var delete_2 = require("./file/delete");
Object.defineProperty(exports, "file_delete", { enumerable: true, get: function () { return delete_2.file_delete; } });
var get_access_token_from_environment_1 = require("./helpers/get-access-token-from-environment");
Object.defineProperty(exports, "helpers_get_access_token_from_environment", { enumerable: true, get: function () { return get_access_token_from_environment_1.helpers_get_access_token_from_environment; } });
var get_api_1 = require("./helpers/get-api");
Object.defineProperty(exports, "helpers_get_api", { enumerable: true, get: function () { return get_api_1.helpers_get_api; } });
var update_1 = require("./metadata/update");
Object.defineProperty(exports, "metadata_update", { enumerable: true, get: function () { return update_1.metadata_update; } });
//# sourceMappingURL=index.js.map