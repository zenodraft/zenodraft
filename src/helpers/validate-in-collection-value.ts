import { get_deposition_details } from '../deposition/show/details'


export const validate_in_collection_value = async (sandbox: boolean, collection_id: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`checking that the collection_id value resolves to a concept, not a version...`)
    }
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await get_deposition_details(sandbox, id)
    if (deposition.conceptrecid !== collection_id) {
        throw new Error('Deposition id should be a concept id.')
    }
}
