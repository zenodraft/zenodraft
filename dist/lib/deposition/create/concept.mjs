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
import { helpers_get_api } from '../../helpers/get-api';
export const deposition_create_concept = (token, sandbox, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`creating a new, empty deposition in a new concept...`);
    }
    const api = helpers_get_api(sandbox);
    const endpoint = '/deposit/depositions';
    const method = 'POST';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const init = { method, headers, body: JSON.stringify({}) };
    let response;
    try {
        response = yield fetch(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            console.debug(response);
            throw new Error('Response was not OK');
        }
    }
    catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`);
    }
    try {
        const deposition = yield response.json();
        if (verbose) {
            console.log(`Created new record ${deposition.record_id}.`);
        }
        return deposition.record_id.toString();
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`);
    }
});