import { deposition_show_details } from './details'
import { helpers_get_record_type } from '../../helpers/get-record-type'
import * as assert from 'assert'



export const deposition_show_prereserved = async (sandbox: boolean, latest_id: string, verbose = false): Promise<string> => {
    const record_type = await helpers_get_record_type(sandbox, latest_id, verbose)
    assert(record_type === 'deposition', 'Input id is not a deposition.')

    const deposition = await deposition_show_details(sandbox, latest_id, verbose)
    return deposition.metadata.prereserve_doi.doi
}
