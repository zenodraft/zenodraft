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
exports.helpers_get_record_type = void 0;
const details_1 = require("../deposition/show/details");
const assert = require("assert");
const helpers_get_record_type = (token, sandbox, id, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log(`getting the deposition type...`);
    }
    const regex = new RegExp('^[0-9]+$');
    assert(regex.test(id) === true, 'Deposition id has invalid format.');
    try {
        yield details_1.deposition_show_details(token, sandbox, id);
        return 'deposition';
    }
    catch (e) {
        // no problem
    }
    try {
        const id_next = (parseInt(id) + 1).toString();
        const details_next = yield details_1.deposition_show_details(token, sandbox, id_next);
        if (details_next.conceptrecid === id) {
            return 'collection';
        }
    }
    catch (err) {
        // no problem
    }
    throw new Error(`Can\'t determine record type of id ${id}.`);
});
exports.helpers_get_record_type = helpers_get_record_type;
//# sourceMappingURL=get-record-type.js.map