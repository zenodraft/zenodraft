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
export const deposition_show_prereserved = (sandbox, latest_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    const record_type = yield helpers_get_record_type(sandbox, latest_id, verbose);
    assert(record_type === 'deposition', 'Input id is not a deposition.');
    const deposition = yield deposition_show_details(sandbox, latest_id, verbose);
    return deposition.metadata.prereserve_doi.doi;
});
//# sourceMappingURL=prereserved.js.map