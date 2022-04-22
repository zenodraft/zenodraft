import { default as fetch, Response, RequestInit } from 'node-fetch'
import { AnyDeposition } from './../../helpers/deposition-types'
import { helpers_get_api } from './../../helpers/get-api'
import * as assert from 'assert'


const fetch_details = async (token: string, sandbox: boolean, id: string): Promise<AnyDeposition> => {
    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${id}`
    const method = 'GET'
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const init: RequestInit = { method, headers }
    let response: Response
    try {
        response = await fetch(`${api}${endpoint}`, init)
    } catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`)
    }
    if (response.ok !== true) {
        throw new Error(`Response was ${response.status} - ${response.statusText}`)
    }
    try {
        return await response.json()
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`)
    }    
}


export const deposition_show_details = async (token: string, sandbox: boolean, id: string,
                                              expected_type: 'concept' | 'version', verbose = false): Promise<AnyDeposition> => {

    if (verbose) {
        console.log(`Getting details for ${expected_type} with id ${id}...`)
    }
    const regex = /^[\d]+$/
    assert(regex.test(id) === true, 'id has invalid format.')
    if (expected_type === 'version') {
        return fetch_details(token, sandbox, id)
    }
    if (expected_type === 'concept') {
        const id_next = (parseInt(id) + 1).toString()
        let details_next: AnyDeposition
        details_next = await fetch_details(token, sandbox, id_next)
        if (details_next.conceptrecid === id) {
            return details_next
        }
        throw new Error(`Encountered a problem with contents of concept ${id}.`)
    }
    throw new Error(`Input argument 'expected_type' should be either 'version' or 'concept'.`)
}
