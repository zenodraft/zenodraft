var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { get_deposition_details } from './details';
import { validate_in_collection_value } from '../../helpers/validate-in-collection-value';
export const get_latest_draft = (sandbox, collection_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    yield validate_in_collection_value(sandbox, collection_id, verbose);
    const id = (parseInt(collection_id) + 1).toString();
    const deposition = yield get_deposition_details(sandbox, id, verbose);
    let latest_draft_id;
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0];
    }
    else {
        latest_draft_id = '';
    }
    return latest_draft_id;
});
