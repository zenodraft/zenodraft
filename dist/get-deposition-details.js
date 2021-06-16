import fetch from 'node-fetch';
import { get_access_token_from_environment } from './get-access-token-from-environment.js';
import { get_api } from './get-api.js';
export const get_deposition_details = async (sandbox, id, verbose = false) => {
    if (verbose) {
        console.log(`getting deposition details for deposition with id ${id}...`);
    }
    const access_token = get_access_token_from_environment(sandbox);
    const api = get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'GET';
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };
    const init = { method, headers };
    let response;
    try {
        response = await fetch(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        console.debug(response);
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText} `);
    }
    try {
        const deposition = await response.json();
        return deposition;
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`);
    }
};
