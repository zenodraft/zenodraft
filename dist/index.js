import { add_file_to_deposition } from './add-file-to-deposition.js';
import { cli } from './cli.js';
import { create_empty_deposition_in_existing_collection } from './create-empty-deposition-in-existing-collection.js';
import { create_empty_deposition_in_new_collection } from './create-empty-deposition-in-new-collection.js';
import { delete_deposition_file } from './delete-deposition-file.js';
import { delete_draft_deposition } from './delete-draft-deposition.js';
import { get_access_token_from_environment } from './get-access-token-from-environment.js';
import { get_api } from './get-api.js';
import { get_deposition_details } from './get-deposition-details.js';
import { get_latest_draft } from './get-latest-draft.js';
import { publish_draft_deposition } from './publish-draft-deposition.js';
import { update_deposition_metadata } from './update-deposition-metadata.js';
import { validate_in_collection_value } from './validate-in-collection-value.js';
export default {
    add_file_to_deposition,
    cli,
    create_empty_deposition_in_existing_collection,
    create_empty_deposition_in_new_collection,
    delete_deposition_file,
    delete_draft_deposition,
    get_access_token_from_environment,
    get_api,
    get_deposition_details,
    get_latest_draft,
    publish_draft_deposition,
    update_deposition_metadata,
    validate_in_collection_value
};
