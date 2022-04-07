"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposition_create_version = void 0;
const node_fetch_1 = require("node-fetch");
const files_1 = require("../../deposition/show/files");
const latest_1 = require("../../deposition/show/latest");
const delete_1 = require("../../file/delete");
const get_api_1 = require("../../helpers/get-api");
const update_1 = require("../../metadata/update");
const deposition_create_version = (token, sandbox, concept_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`creating a new, empty versioned deposition in existing concept...`);
    }
    const latest_id = yield latest_1.deposition_show_latest(token, sandbox, concept_id, verbose);
    const new_id = yield create_new_versioned_deposition(token, sandbox, latest_id, verbose);
    yield remove_files_from_draft(token, sandbox, new_id, verbose);
    yield update_1.metadata_update(token, sandbox, new_id, undefined, verbose);
    return new_id;
});
exports.deposition_create_version = deposition_create_version;
const create_new_versioned_deposition = (token, sandbox, latest_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`creating a new version off of latest version in concept...`);
    }
    const api = get_api_1.helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${latest_id}/actions/newversion`;
    const method = 'POST';
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    const init = { method, headers };
    let response;
    try {
        response = yield node_fetch_1.default(`${api}${endpoint}`, init);
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
    const filenames = yield files_1.deposition_show_files(token, sandbox, id, verbose);
    for (const filename of filenames) {
        delete_1.file_delete(token, sandbox, id, filename);
    }
});
//# sourceMappingURL=version.js.map