import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { DepositionsResponse } from './zenodo-response-types'


export const create_empty_deposition_in_new_collection = async (api: string, access_token: string): Promise<string> => {
    console.log(`creating a new, empty deposition in a new collection...`)
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
        throw new Error(`Something went wrong on POST to ${api}${endpoint}: ${response.status} - ${response.statusText} \n\n\n ${e}`)
    }

    try {
        const deposition: DepositionsResponse = await response.json()
        console.log(`Created new record ${deposition.record_id}.`)
        return deposition.record_id
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`)
    }
}
