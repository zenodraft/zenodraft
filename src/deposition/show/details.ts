import { DepositionsResponse } from './../../helpers/zenodo-response-types'
import { helpers_get_api } from './../../helpers/get-api'
import { RequestInit, Response } from 'node-fetch'
import * as assert from 'assert'
import fetch from 'node-fetch'



type RecordType = 'collection' | 'deposition'



const fetch_details = async (token: string, sandbox: boolean, id: string): Promise<DepositionsResponse> => {
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
        const deposition: DepositionsResponse = await response.json()
        return deposition
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`)
    }    
}


export const deposition_show_details = async (token: string, sandbox: boolean, id: string,
                                              expected_type: RecordType, verbose = false): Promise<DepositionsResponse> => {

    if (verbose) {
        console.log(`getting ${expected_type} details for record with id ${id}...`)
    }

    const regex = new RegExp('^[0-9]+$')
    assert(regex.test(id) === true, 'Deposition id has invalid format.')


    if (expected_type === 'deposition') {
        try {
            return await fetch_details(token, sandbox, id)
        } catch (e) {
            throw e
        }
    } else if (expected_type === 'collection') {
        const id_next = (parseInt(id) + 1).toString()
        let details_next: DepositionsResponse
        try {
            details_next = await fetch_details(token, sandbox, id_next)
        } catch (e) {
            throw e
        }
        if (details_next.conceptrecid === id) {
            return details_next
        } else {
            throw new Error(`Encountered a problem with contents of collection record ${id}.`)
        }
    } else {
        throw new Error(`Input argument 'expected_type' should be either 'deposition' or 'collection'.`)
    }

}
