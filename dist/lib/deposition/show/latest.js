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
const details_1 = require("./../../deposition/show/details");
const deposition_show_latest = (token, sandbox, collection_id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    const deposition = yield details_1.deposition_show_details(token, sandbox, collection_id, 'collection', verbose);
    let latest_id;
    if ('latest' in deposition.links && deposition.links.latest !== undefined) {
        latest_id = deposition.links.latest.split('/').slice(-1)[0];
    }
    else {
        throw new Error(`There are no published versions in collection ${collection_id}.`);
    }
    return latest_id;
});
exports.deposition_show_latest = deposition_show_latest;
//# sourceMappingURL=latest.js.map