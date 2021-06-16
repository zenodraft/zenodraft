import fetch from 'node-fetch';
import * as fs from 'fs';
import { get_access_token_from_environment } from './get-access-token-from-environment.js';
import { get_api } from './get-api.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
export const update_deposition_metadata = async (sandbox, id, filename, verbose = false) => {
    if (verbose) {
        if (filename === undefined) {
            console.log(`clearing metadata from deposition with id ${id}...`);
        }
        else {
            console.log(`adding metadata from ${filename} to deposition with id ${id}...`);
        }
    }
    const access_token = get_access_token_from_environment(sandbox);
    const api = get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'PUT';
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };
    const here = fileURLToPath(import.meta.url);
    const parent = path.dirname(here);
    const minimal_metadata_filename = path.join(parent, '.zenodo.json.empty');
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'));
    const user_metadata = filename === undefined ? {} : JSON.parse(fs.readFileSync(filename, 'utf8'));
    const metadata = { ...minimal_metadata, ...user_metadata };
    const init = { method, headers, body: JSON.stringify({ metadata }) };
    let response;
    try {
        response = await fetch(`${api}${endpoint}`, init);
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
