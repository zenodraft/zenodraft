import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { helpers_get_api } from '../helpers/get-api'
import { helpers_get_record_type } from '../helpers/get-record-type'
import * as assert from 'assert'



export const deposition_publish = async (token: string, sandbox: boolean, id: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`publishing draft deposition with id ${id}...`)
    }
    const record_type = await helpers_get_record_type(token, sandbox, id, verbose)
    assert(record_type === 'deposition', 'Input id is not a deposition.')
    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${id}/actions/publish`
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const init: RequestInit = { method, headers }
    let response: any
    try {
        response = await fetch(`${api}${endpoint}`, init)
        if (response.ok !== true) {
            throw new Error()
        }
    } catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`)
    }
}
