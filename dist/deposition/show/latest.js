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
exports.deposition_show_latest = void 0;
const details_1 = require("./details");
const validate_in_collection_value_1 = require("../../helpers/validate-in-collection-value");
const deposition_show_latest = (sandbox, collection_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    yield validate_in_collection_value_1.helpers_validate_in_collection_value(sandbox, collection_id, verbose);
    const id = (parseInt(collection_id) + 1).toString();
    const deposition = yield details_1.deposition_show_details(sandbox, id, verbose);
    let latest_draft_id;
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0];
    }
    else {
        latest_draft_id = '';
    }
    return latest_draft_id;
});
exports.deposition_show_latest = deposition_show_latest;
