import { deposition_show_details } from '../deposition/show/details'
import { helpers_get_record_type } from '../helpers/get-record-type'
import { RequestInit } from 'node-fetch'
import * as assert from 'assert'
import fetch from 'node-fetch'



export const file_delete = async (token: string, sandbox: boolean, id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${id}...`)
    }
    const record_type = await helpers_get_record_type(token, sandbox, id, verbose)
    assert(record_type === 'deposition', 'Input id is not a deposition.')
    const deposition = await deposition_show_details(token, sandbox, id)
    const bucket = deposition.links.bucket
    const method = 'DELETE'
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const init: RequestInit = { method, headers }
    let response: any
    try {
        response = await fetch(`${bucket}/${filename}`, init)
        if (response.ok !== true) {
            throw new Error()
        }
    } catch (e) {
        throw new Error(`Something went wrong on ${method} to ${bucket}/${filename}: ${response.status} - ${response.statusText} `)
    }
}
