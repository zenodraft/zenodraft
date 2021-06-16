"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_empty_deposition_in_new_collection = void 0;
const node_fetch_1 = require("node-fetch");
const get_access_token_from_environment_js_1 = require("./get-access-token-from-environment.js");
const get_api_js_1 = require("./get-api.js");
const create_empty_deposition_in_new_collection = async (sandbox, verbose = false) => {
    if (verbose) {
        console.log(`creating a new, empty deposition in a new collection...`);
    }
    const access_token = get_access_token_from_environment_js_1.get_access_token_from_environment(sandbox);
    const api = get_api_js_1.get_api(sandbox);
    const endpoint = '/deposit/depositions';
    const method = 'POST';
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };
    const init = { method, headers, body: JSON.stringify({}) };
    let response;
    try {
        response = await node_fetch_1.default(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            console.debug(response);
            throw new Error('Response was not OK');
        }
    }
    catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText} \n\n\n ${e}`);
    }
    try {
        const deposition = await response.json();
        if (verbose) {
            console.log(`Created new record ${deposition.record_id}.`);
        }
        console.log(`${deposition.record_id}`);
        return deposition.record_id;
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`);
    }
};
exports.create_empty_deposition_in_new_collection = create_empty_deposition_in_new_collection;
