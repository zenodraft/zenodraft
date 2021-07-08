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
exports.deposition_delete = void 0;
const details_1 = require("../deposition/show/details");
const get_api_1 = require("../helpers/get-api");
const node_fetch_1 = require("node-fetch");
const deposition_delete = (token, sandbox, id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`deleting draft deposition with id ${id}...`);
    }
    yield details_1.deposition_show_details(token, sandbox, id, 'deposition', verbose);
    const api = get_api_1.helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'DELETE';
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    const init = { method, headers };
    let response;
    try {
        response = yield node_fetch_1.default(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`);
    }
});
exports.deposition_delete = deposition_delete;
//# sourceMappingURL=delete.js.map