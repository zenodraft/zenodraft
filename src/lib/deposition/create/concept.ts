import { default as fetch, RequestInit } from 'node-fetch'
import { AnyDeposition, HasDraft } from '../../helpers/deposition-types'
import { helpers_get_api } from '../../helpers/get-api'



export const deposition_create_concept = async (token: string, sandbox: boolean, verbose = false): Promise<string> => {
    if (verbose) {
        console.log(`creating a new, empty version in a new concept...`)
    }
    const api = helpers_get_api(sandbox)
    const endpoint = '/deposit/depositions'
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const init: RequestInit = { method, headers, body: JSON.stringify({}) }
    let response: any
    try {
        response = await fetch(`${api}${endpoint}`, init)
        if (response.ok !== true) {
            console.debug(response)
            throw new Error('Response was not OK')
        }
    } catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`)
    }

    try {
        const deposition: AnyDeposition & HasDraft = await response.json()
        if (verbose) {
            console.log(`Created new version with id ${deposition.record_id}.`)
        }
        return deposition.record_id.toString()
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`)
    }
}
