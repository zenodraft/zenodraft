"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = require("./file/add");
const cli_1 = require("./cli");
const in_existing_collection_1 = require("./deposition/create/in-existing-collection");
const in_new_collection_1 = require("./deposition/create/in-new-collection");
const delete_1 = require("./file/delete");
const delete_2 = require("./deposition/delete");
const get_access_token_from_environment_1 = require("./helpers/get-access-token-from-environment");
const get_api_1 = require("./helpers/get-api");
const details_1 = require("./deposition/show/details");
const latest_1 = require("./deposition/show/latest");
const publish_1 = require("./deposition/publish");
const update_1 = require("./metadata/update");
const validate_in_collection_value_1 = require("./helpers/validate-in-collection-value");
exports.default = {
    add_file_to_deposition: add_1.add_file_to_deposition,
    cli: cli_1.cli,
    create_empty_deposition_in_existing_collection: in_existing_collection_1.create_empty_deposition_in_existing_collection,
    create_empty_deposition_in_new_collection: in_new_collection_1.create_empty_deposition_in_new_collection,
    delete_deposition_file: delete_1.delete_deposition_file,
    delete_draft_deposition: delete_2.delete_draft_deposition,
    get_access_token_from_environment: get_access_token_from_environment_1.get_access_token_from_environment,
    get_api: get_api_1.get_api,
    get_deposition_details: details_1.get_deposition_details,
    get_latest_draft: latest_1.get_latest_draft,
    publish_draft_deposition: publish_1.publish_draft_deposition,
    update_deposition_metadata: update_1.update_deposition_metadata,
    validate_in_collection_value: validate_in_collection_value_1.validate_in_collection_value
};
