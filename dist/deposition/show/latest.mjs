var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_show_details } from './details';
import { helpers_get_record_type } from '../../helpers/get-record-type';
import * as assert from 'assert';
export const deposition_show_latest = (token, sandbox, collection_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    const record_type = yield helpers_get_record_type(token, sandbox, collection_id, verbose);
    assert(record_type === 'collection', 'Input id is not a collection.');
    const id = (parseInt(collection_id) + 1).toString();
    const deposition = yield deposition_show_details(token, sandbox, id, verbose);
    let latest_draft_id;
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0];
    }
    else {
        latest_draft_id = '';
    }
    return latest_draft_id;
});
//# sourceMappingURL=latest.js.map