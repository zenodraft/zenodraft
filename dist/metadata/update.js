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
exports.metadata_update = void 0;
const node_fetch_1 = require("node-fetch");
const details_1 = require("../deposition/show/details");
const get_api_1 = require("../helpers/get-api");
const fs = require("fs");
const path = require("path");
const metadata_update = (token, sandbox, id, filename, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        if (filename === undefined) {
            console.log(`clearing metadata from deposition with id ${id}...`);
        }
        else {
            console.log(`adding metadata from ${filename} to deposition with id ${id}...`);
        }
    }
    yield details_1.deposition_show_details(token, sandbox, id, 'deposition', verbose);
    const api = get_api_1.helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'PUT';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const minimal_metadata_filename = path.join(__dirname, '..', '..', 'assets', '.zenodo.json.empty');
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'));
    const user_metadata = filename === undefined ? {} : JSON.parse(fs.readFileSync(filename, 'utf8'));
    const metadata = Object.assign(Object.assign({}, minimal_metadata), user_metadata);
    const init = { method, headers, body: JSON.stringify({ metadata }) };
    let response;
    try {
        response = yield node_fetch_1.default(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            throw new Error('Response was not OK');
        }
    }
    catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`);
    }
    try {
        const deposition = yield response.json();
        if (verbose) {
            console.log(`Updated record ${deposition.record_id}.`);
        }
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`);
    }
});
exports.metadata_update = metadata_update;
//# sourceMappingURL=update.js.map