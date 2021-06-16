"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_file_to_deposition_js_1 = require("./add-file-to-deposition.js");
const cli_js_1 = require("./cli.js");
const create_empty_deposition_in_existing_collection_js_1 = require("./create-empty-deposition-in-existing-collection.js");
const create_empty_deposition_in_new_collection_js_1 = require("./create-empty-deposition-in-new-collection.js");
const delete_deposition_file_js_1 = require("./delete-deposition-file.js");
const delete_draft_deposition_js_1 = require("./delete-draft-deposition.js");
const get_access_token_from_environment_js_1 = require("./get-access-token-from-environment.js");
const get_api_js_1 = require("./get-api.js");
const get_deposition_details_js_1 = require("./get-deposition-details.js");
const get_latest_draft_js_1 = require("./get-latest-draft.js");
const publish_draft_deposition_js_1 = require("./publish-draft-deposition.js");
const update_deposition_metadata_js_1 = require("./update-deposition-metadata.js");
const validate_in_collection_value_js_1 = require("./validate-in-collection-value.js");
exports.default = {
    add_file_to_deposition: add_file_to_deposition_js_1.add_file_to_deposition,
    cli: cli_js_1.cli,
    create_empty_deposition_in_existing_collection: create_empty_deposition_in_existing_collection_js_1.create_empty_deposition_in_existing_collection,
    create_empty_deposition_in_new_collection: create_empty_deposition_in_new_collection_js_1.create_empty_deposition_in_new_collection,
    delete_deposition_file: delete_deposition_file_js_1.delete_deposition_file,
    delete_draft_deposition: delete_draft_deposition_js_1.delete_draft_deposition,
    get_access_token_from_environment: get_access_token_from_environment_js_1.get_access_token_from_environment,
    get_api: get_api_js_1.get_api,
    get_deposition_details: get_deposition_details_js_1.get_deposition_details,
    get_latest_draft: get_latest_draft_js_1.get_latest_draft,
    publish_draft_deposition: publish_draft_deposition_js_1.publish_draft_deposition,
    update_deposition_metadata: update_deposition_metadata_js_1.update_deposition_metadata,
    validate_in_collection_value: validate_in_collection_value_js_1.validate_in_collection_value
};
