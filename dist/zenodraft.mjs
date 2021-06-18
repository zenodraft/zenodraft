import { file_add } from './file/add';
import { cli } from './cli';
import { deposition_create_in_existing_collection } from './deposition/create/in-existing-collection';
import { deposition_create_in_new_collection } from './deposition/create/in-new-collection';
import { file_delete } from './file/delete';
import { deposition_delete } from './deposition/delete';
import { get_access_token_from_environment } from './helpers/get-access-token-from-environment';
import { get_api } from './helpers/get-api';
import { deposition_show_details } from './deposition/show/details';
import { deposition_show_latest } from './deposition/show/latest';
import { get_prereserved } from './deposition/show/prereserved';
import { publish_draft_deposition } from './deposition/publish';
import { update_deposition_metadata } from './metadata/update';
import { validate_in_collection_value } from './helpers/validate-in-collection-value';
export default {
    file_add,
    cli,
    deposition_create_in_existing_collection,
    deposition_create_in_new_collection,
    file_delete,
    deposition_delete,
    get_access_token_from_environment,
    get_api,
    deposition_show_details,
    deposition_show_latest,
    get_prereserved,
    publish_draft_deposition,
    update_deposition_metadata,
    validate_in_collection_value
};
