"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposition_show_details = void 0;
const node_fetch_1 = require("node-fetch");
const get_api_1 = require("./../../helpers/get-api");
const assert = require("assert");
const fetch_details = (token, sandbox, id) => __awaiter(void 0, void 0, void 0, function* () {
    const api = get_api_1.helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'GET';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const init = { method, headers };
    let response;
    try {
        response = yield node_fetch_1.default(`${api}${endpoint}`, init);
    }
    catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`);
    }
    if (response.ok !== true) {
        throw new Error(`Response was ${response.status} - ${response.statusText}`);
    }
    try {
        return response.json();
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`);
    }
});
const deposition_show_details = (token, sandbox, id, expected_type, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`getting ${expected_type} details for record with id ${id}...`);
    }
    const regex = new RegExp('^[0-9]+$');
    assert(regex.test(id) === true, 'id has invalid format.');
    if (expected_type === 'deposition') {
        return yield fetch_details(token, sandbox, id);
    }
    else if (expected_type === 'collection') {
        const id_next = (parseInt(id) + 1).toString();
        let details_next;
        details_next = yield fetch_details(token, sandbox, id_next);
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
exports.deposition_show_details = deposition_show_details;
//# sourceMappingURL=details.js.map