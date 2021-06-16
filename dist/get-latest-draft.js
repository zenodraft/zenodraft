"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_latest_draft = void 0;
const get_deposition_details_js_1 = require("./get-deposition-details.js");
const validate_in_collection_value_js_1 = require("./validate-in-collection-value.js");
const get_latest_draft = async (sandbox, collection_id, verbose = false) => {
    await validate_in_collection_value_js_1.validate_in_collection_value(sandbox, collection_id, verbose);
    const id = (parseInt(collection_id) + 1).toString();
    const deposition = await get_deposition_details_js_1.get_deposition_details(sandbox, id, verbose);
    let latest_draft_id;
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0];
    }
    else {
        latest_draft_id = '';
    }
    return latest_draft_id;
};
exports.get_latest_draft = get_latest_draft;
