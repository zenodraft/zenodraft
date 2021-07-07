import { deposition_show_details } from './details'
import { helpers_get_record_type } from '../../helpers/get-record-type'
import * as assert from 'assert'


export const deposition_show_latest = async (sandbox: boolean, collection_id: string, verbose = false): Promise<string> => {
    const record_type = await helpers_get_record_type(sandbox, collection_id, verbose)
    assert(record_type === 'collection', 'Input id is not a collection.')
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await deposition_show_details(sandbox, id, verbose)
    let latest_draft_id: string
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0]
    } else {
        latest_draft_id = ''
    }
    return latest_draft_id
}
