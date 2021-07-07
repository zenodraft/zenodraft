import { deposition_show_details } from '../deposition/show/details'
import { DepositionsResponse } from './zenodo-response-types'
import * as assert from 'assert'



type RecordType = 'collection' | 'deposition'

export const helpers_get_record_type = async (sandbox: boolean, id: string, verbose = false): Promise<RecordType> => {
    if (verbose) {
        console.log(`getting the deposition type...`)
    }
    const regex = new RegExp('^[0-9]+$')
    assert(regex.test(id) === true, 'Deposition id has invalid format.')

    try {
        await deposition_show_details(sandbox, id)
        return 'deposition'
    } catch (e) {
        // no problem
    }

    try {
        const id_next = (parseInt(id) + 1).toString()        
        const details_next = await deposition_show_details(sandbox, id_next)
        if (details_next.conceptrecid === id) {
            return 'collection'
        }
    } catch (err) {
        // no problem
    }

    throw new Error(`Can\'t determine record type of id ${id}.`)
}
