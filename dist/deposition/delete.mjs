var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_show_details } from '../deposition/show/details';
import { helpers_get_api } from '../helpers/get-api';
import fetch from 'node-fetch';
export const deposition_delete = (token, sandbox, id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`deleting draft deposition with id ${id}...`);
    }
    yield deposition_show_details(token, sandbox, id, 'deposition', verbose);
    const api = helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'DELETE';
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    const init = { method, headers };
    let response;
    try {
        response = yield fetch(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`);
    }
});
//# sourceMappingURL=delete.js.map