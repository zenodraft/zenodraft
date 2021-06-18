import { cli } from './cli';
import { deposition_create_in_existing_collection } from './deposition/create/in-existing-collection';
import { deposition_create_in_new_collection } from './deposition/create/in-new-collection';
import { deposition_delete } from './deposition/delete';
import { deposition_publish } from './deposition/publish';
import { deposition_show_details } from './deposition/show/details';
import { deposition_show_latest } from './deposition/show/latest';
import { deposition_show_prereserved } from './deposition/show/prereserved';
import { file_add } from './file/add';
import { file_delete } from './file/delete';
import { helpers_get_access_token_from_environment } from './helpers/get-access-token-from-environment';
import { helpers_get_api } from './helpers/get-api';
import { helpers_validate_in_collection_value } from './helpers/validate-in-collection-value';
import { metadata_update } from './metadata/update';
export default {
    cli,
    deposition_create_in_existing_collection,
    deposition_create_in_new_collection,
    deposition_delete,
    deposition_publish,
    deposition_show_details,
    deposition_show_latest,
    deposition_show_prereserved,
    file_add,
    file_delete,
    helpers_get_access_token_from_environment,
    helpers_get_api,
    helpers_validate_in_collection_value,
    metadata_update
};
