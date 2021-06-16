"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_deposition_file = void 0;
const node_fetch_1 = require("node-fetch");
const get_deposition_details_js_1 = require("./get-deposition-details.js");
const get_access_token_from_environment_js_1 = require("./get-access-token-from-environment.js");
const delete_deposition_file = async (sandbox, id, filename, verbose = false) => {
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${id}...`);
    }
    const access_token = get_access_token_from_environment_js_1.get_access_token_from_environment(sandbox);
    const deposition = await get_deposition_details_js_1.get_deposition_details(sandbox, id);
    const bucket = deposition.links.bucket;
    const method = 'DELETE';
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    const init = { method, headers };
    let response;
    try {
        response = await node_fetch_1.default(`${bucket}/${filename}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        console.debug(response);
        throw new Error(`Something went wrong on PUT to ${bucket}/${filename}: ${response.status} - ${response.statusText} `);
    }
};
exports.delete_deposition_file = delete_deposition_file;
