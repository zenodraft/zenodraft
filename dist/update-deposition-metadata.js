"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_deposition_metadata = void 0;
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
const get_access_token_from_environment_js_1 = require("./get-access-token-from-environment.js");
const get_api_js_1 = require("./get-api.js");
const path = require("path");
const update_deposition_metadata = async (sandbox, id, filename, verbose = false) => {
    if (verbose) {
        if (filename === undefined) {
            console.log(`clearing metadata from deposition with id ${id}...`);
        }
        else {
            console.log(`adding metadata from ${filename} to deposition with id ${id}...`);
        }
    }
    const access_token = get_access_token_from_environment_js_1.get_access_token_from_environment(sandbox);
    const api = get_api_js_1.get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'PUT';
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };
    const minimal_metadata_filename = path.join(__dirname, '.zenodo.json.empty');
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'));
    const user_metadata = filename === undefined ? {} : JSON.parse(fs.readFileSync(filename, 'utf8'));
    const metadata = { ...minimal_metadata, ...user_metadata };
    const init = { method, headers, body: JSON.stringify({ metadata }) };
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
            console.log(`Updated record ${deposition.record_id}.`);
        }
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`);
    }
};
exports.update_deposition_metadata = update_deposition_metadata;
