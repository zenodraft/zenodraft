var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { default as fetch } from 'node-fetch';
import { deposition_show_files } from '../../deposition/show/files';
import { deposition_show_latest } from '../../deposition/show/latest';
import { file_delete } from '../../file/delete';
import { helpers_get_api } from '../../helpers/get-api';
import { metadata_update } from '../../metadata/update';
export const deposition_create_in_existing_collection = (token, sandbox, collection_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`creating a new, empty versioned deposition in existing collection...`);
    }
    const latest_id = yield deposition_show_latest(token, sandbox, collection_id, verbose);
    const new_id = yield create_new_versioned_deposition(token, sandbox, latest_id, verbose);
    yield remove_files_from_draft(token, sandbox, new_id, verbose);
    yield metadata_update(token, sandbox, new_id, undefined, verbose);
    return new_id;
});
const create_new_versioned_deposition = (token, sandbox, latest_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`creating a new version off of latest version in collection...`);
    }
    const api = helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${latest_id}/actions/newversion`;
    const method = 'POST';
    const headers = {
        'Authorization': `Bearer ${token}`
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
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`);
    }
    try {
        const deposition = yield response.json();
        const new_id = deposition.links.latest_draft.split('/').slice(-1)[0];
        if (verbose) {
            console.log(`created new record ${new_id}`);
        }
        return new_id;
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`);
    }
});
const remove_files_from_draft = (token, sandbox, id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`removing any files from the newly drafted version...`);
    }
    const filenames = yield deposition_show_files(token, sandbox, id, verbose);
    for (const filename of filenames) {
        file_delete(token, sandbox, id, filename);
    }
});
