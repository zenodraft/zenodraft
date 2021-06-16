"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_file_to_deposition = void 0;
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
const get_deposition_details_js_1 = require("./get-deposition-details.js");
const mime = require("mime-types");
const get_access_token_from_environment_js_1 = require("./get-access-token-from-environment.js");
const add_file_to_deposition = async (sandbox, id, filename, verbose = false) => {
    if (verbose) {
        console.log(`adding file ${filename} to deposition with id ${id}...`);
    }
    const access_token = get_access_token_from_environment_js_1.get_access_token_from_environment(sandbox);
    const deposition = await get_deposition_details_js_1.get_deposition_details(sandbox, id);
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
        response = await node_fetch_1.default(`${bucket}/${filename}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        console.debug(response);
        throw new Error(`Something went wrong on ${method} to ${bucket}/${filename}: ${response.status} - ${response.statusText} `);
    }
};
exports.add_file_to_deposition = add_file_to_deposition;
