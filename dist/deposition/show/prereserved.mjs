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
export const get_prereserved = (sandbox, latest_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    const deposition = yield get_deposition_details(sandbox, latest_id, verbose);
    return deposition.metadata.prereserve_doi.doi;
});
