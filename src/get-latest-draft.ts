import { get_deposition_details } from './get-deposition-details.js'
import { validate_in_collection_value } from './validate-in-collection-value.js'


export const get_latest_draft = async (sandbox: boolean, collection_id: string): Promise<string> => {
    // crudely suppress other outputs
    const temp = console.log
    console.log = (s?: string):void => {}
    await validate_in_collection_value(sandbox, collection_id)
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await get_deposition_details(sandbox, id)
    let latest_draft_id: string
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0]
    } else {
        latest_draft_id = ''
    }
    console.log = temp
    return latest_draft_id
}
