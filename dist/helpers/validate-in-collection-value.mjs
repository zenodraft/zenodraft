var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { get_deposition_details } from '../deposition/show/details';
export const validate_in_collection_value = (sandbox, collection_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`checking that the collection_id value resolves to a concept, not a version...`);
    }
    const id = (parseInt(collection_id) + 1).toString();
    const deposition = yield get_deposition_details(sandbox, id);
    if (deposition.conceptrecid !== collection_id) {
        throw new Error('Deposition id should be a concept id.');
    }
});
