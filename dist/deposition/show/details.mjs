var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { helpers_get_api } from './../../helpers/get-api';
import * as assert from 'assert';
import fetch from 'node-fetch';
const fetch_details = (token, sandbox, id) => __awaiter(void 0, void 0, void 0, function* () {
    const api = helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'GET';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const init = { method, headers };
    let response;
    try {
        response = yield fetch(`${api}${endpoint}`, init);
    }
    catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText} `);
    }
    if (response.ok !== true) {
        throw new Error('Response was not 200');
    }
    try {
        const deposition = yield response.json();
        return deposition;
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`);
    }
});
export const deposition_show_details = (token, sandbox, id, expected_type, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`getting ${expected_type} details for record with id ${id}...`);
    }
    const regex = new RegExp('^[0-9]+$');
    assert(regex.test(id) === true, 'Deposition id has invalid format.');
    if (expected_type === 'deposition') {
        try {
            return yield fetch_details(token, sandbox, id);
        }
        catch (e) {
            throw new Error(`Encountered a problem with deposition record ${id}.`);
        }
    }
    else if (expected_type === 'collection') {
        const id_next = (parseInt(id) + 1).toString();
        let details_next;
        try {
            details_next = yield fetch_details(token, sandbox, id_next);
        }
        catch (e) {
            throw new Error(`Encountered a problem fetching collection record ${id}.`);
        }
        if (details_next.conceptrecid === id) {
            return details_next;
        }
        else {
            throw new Error(`Encountered a problem with contents of collection record ${id}.`);
        }
    }
    else {
        throw new Error(`Input argument 'expected_type' should be either 'deposition' or 'collection'.`);
    }
});
//# sourceMappingURL=details.js.map