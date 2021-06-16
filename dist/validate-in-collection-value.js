import { get_deposition_details } from './get-deposition-details.js';
export const validate_in_collection_value = async (sandbox, collection_id, verbose = false) => {
    if (verbose) {
        console.log(`checking that the collection_id value resolves to a concept, not a version...`);
    }
    const id = (parseInt(collection_id) + 1).toString();
    const deposition = await get_deposition_details(sandbox, id);
    if (deposition.conceptrecid !== collection_id) {
        throw new Error('Deposition id should be a concept id.');
    }
};
