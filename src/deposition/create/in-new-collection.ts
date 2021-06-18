import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { DepositionsResponse } from '../../helpers/zenodo-response-types'
import { helpers_get_access_token_from_environment } from '../../helpers/get-access-token-from-environment'
import { helpers_get_api } from '../../helpers/get-api'


export const deposition_create_in_new_collection = async (sandbox: boolean, verbose = false): Promise<string> => {
    if (verbose) {
        console.log(`creating a new, empty deposition in a new collection...`)
    }
    const access_token = helpers_get_access_token_from_environment(sandbox)
    const api = helpers_get_api(sandbox)
    const endpoint = '/deposit/depositions'
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${access_token}`,
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
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText} \n\n\n ${e}`)
    }

    try {
        const deposition: DepositionsResponse = await response.json()
        if (verbose) {
            console.log(`Created new record ${deposition.record_id}.`)
        }
        console.log(`${deposition.record_id}`)
        return deposition.record_id
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`)
    }
}
