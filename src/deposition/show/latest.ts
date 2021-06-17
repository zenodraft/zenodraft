import { get_deposition_details } from './details'
import { validate_in_collection_value } from '../../helpers/validate-in-collection-value'


export const get_latest_draft = async (sandbox: boolean, collection_id: string, verbose = false): Promise<string> => {
    await validate_in_collection_value(sandbox, collection_id, verbose)
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await get_deposition_details(sandbox, id, verbose)
    let latest_draft_id: string
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0]
    } else {
        latest_draft_id = ''
    }
    return latest_draft_id
}
