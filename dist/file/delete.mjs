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
import { get_deposition_details } from '../deposition/show/details';
import { get_access_token_from_environment } from '../helpers/get-access-token-from-environment';
export const delete_deposition_file = (sandbox, id, filename, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${id}...`);
    }
    const access_token = get_access_token_from_environment(sandbox);
    const deposition = yield get_deposition_details(sandbox, id);
    const bucket = deposition.links.bucket;
    const method = 'DELETE';
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    const init = { method, headers };
    let response;
    try {
        response = yield fetch(`${bucket}/${filename}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        console.debug(response);
        throw new Error(`Something went wrong on PUT to ${bucket}/${filename}: ${response.status} - ${response.statusText} `);
    }
});
