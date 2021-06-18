var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_show_details } from '../../deposition/show/details';
import fetch from 'node-fetch';
import { file_delete } from '../../file/delete';
import { metadata_update } from '../../metadata/update';
import { helpers_get_access_token_from_environment } from '../../helpers/get-access-token-from-environment';
import { helpers_get_api } from '../../helpers/get-api';
import { helpers_validate_in_collection_value } from '../../helpers/validate-in-collection-value';
export const deposition_create_in_existing_collection = (sandbox, collection_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`creating a new, empty versioned deposition in existing collection...`);
    }
    yield helpers_validate_in_collection_value(sandbox, collection_id, verbose);
    const latest_id = yield get_id_for_latest_version_in_collection(sandbox, collection_id, verbose);
    const new_id = yield create_new_versioned_deposition(sandbox, latest_id, verbose);
    yield remove_files_from_draft(sandbox, new_id, verbose);
    yield metadata_update(sandbox, new_id, undefined, verbose);
    return new_id;
});
const create_new_versioned_deposition = (sandbox, latest_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`creating a new version off of latest version in collection...`);
    }
    const access_token = helpers_get_access_token_from_environment(sandbox);
    const api = helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${latest_id}/actions/newversion`;
    const method = 'POST';
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    const init = { method, headers };
    let response;
    try {
        response = yield fetch(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        console.debug(response);
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText} \n\n\n ${e}`);
    }
    try {
        const deposition = yield response.json();
        const new_id = deposition.links.latest_draft.split('/').slice(-1)[0];
        if (verbose) {
            console.log(`created new record ${new_id}`);
        }
        console.log(`${new_id}`);
        return new_id;
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`);
    }
});
const get_id_for_latest_version_in_collection = (sandbox, collection_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`getting id of the latest version in the collection...`);
    }
    const id = (parseInt(collection_id) + 1).toString();
    const deposition = yield deposition_show_details(sandbox, id);
    const latest_id = deposition.links.latest.split('/').slice(-1)[0];
    return latest_id;
});
const remove_files_from_draft = (sandbox, id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`removing any files from the newly drafted version...`);
    }
    const deposition = yield deposition_show_details(sandbox, id);
    const filenames = deposition.files.map((file) => { return file.filename; });
    for (const filename of filenames) {
        file_delete(sandbox, id, filename);
    }
});
