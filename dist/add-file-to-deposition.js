import fetch from 'node-fetch';
import * as fs from 'fs';
import { get_deposition_details } from './get-deposition-details.js';
import * as mime from 'mime-types';
import { get_access_token_from_environment } from './get-access-token-from-environment.js';
export const add_file_to_deposition = async (sandbox, id, filename, verbose = false) => {
    if (verbose) {
        console.log(`adding file ${filename} to deposition with id ${id}...`);
    }
    const access_token = get_access_token_from_environment(sandbox);
    const deposition = await get_deposition_details(sandbox, id);
    const bucket = deposition.links.bucket;
    const content_type = mime.contentType(filename) ? mime.contentType(filename) : 'text/plain';
    const stream = fs.createReadStream(filename);
    const method = 'PUT';
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': content_type,
        'Content-Length': (fs.statSync(filename).size).toString()
    };
    const init = { method, headers, body: stream };
    let response;
    try {
        response = await fetch(`${bucket}/${filename}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        console.debug(response);
        throw new Error(`Something went wrong on ${method} to ${bucket}/${filename}: ${response.status} - ${response.statusText} `);
    }
};
