import { add_file_to_deposition } from './file/add';
import { cli } from './cli';
import { create_empty_deposition_in_existing_collection } from './deposition/create/in-existing-collection';
import { create_empty_deposition_in_new_collection } from './deposition/create/in-new-collection';
import { delete_deposition_file } from './file/delete';
import { delete_draft_deposition } from './deposition/delete';
import { get_access_token_from_environment } from './helpers/get-access-token-from-environment';
import { get_api } from './helpers/get-api';
import { get_deposition_details } from './deposition/show/details';
import { get_latest_draft } from './deposition/show/latest';
import { publish_draft_deposition } from './deposition/publish';
import { update_deposition_metadata } from './metadata/update';
import { validate_in_collection_value } from './helpers/validate-in-collection-value';
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
