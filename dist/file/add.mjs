var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import * as fs from 'fs';
import { deposition_show_details } from '../deposition/show/details';
import * as mime from 'mime-types';
import { helpers_get_access_token_from_environment } from '../helpers/get-access-token-from-environment';
export const file_add = (sandbox, id, filename, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`adding file ${filename} to deposition with id ${id}...`);
    }
    const access_token = helpers_get_access_token_from_environment(sandbox);
    const deposition = yield deposition_show_details(sandbox, id);
    const bucket = deposition.links.bucket;
    let content_type = mime.contentType(filename) ? mime.contentType(filename) : 'text/plain';
    if (content_type.includes('application/json')) {
        // zenodo declines json uploads with a 400 - BAD REQUEST,  
        // avoiding error by setting content type to plain text
        content_type = 'text/plain';
    }
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
        response = yield fetch(`${bucket}/${filename}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        console.debug(response);
        throw new Error(`Something went wrong on ${method} to ${bucket}/${filename}: ${response.status} - ${response.statusText} `);
    }
});
