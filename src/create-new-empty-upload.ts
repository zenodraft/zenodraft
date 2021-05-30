import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { DepositionsResponse } from './zenodo-response-types'


export const create_new_empty_upload = async (api: string, access_token: string): Promise<string> => {
    
    const endpoint = '/deposit/depositions'
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const init: RequestInit = { method, headers, body: JSON.stringify({}) }
    let response: any
    try {
        response = await fetch(api + endpoint, init)
    } catch (e) {
        throw new Error(`Didn't get the expected response from ${api}${endpoint}: ${response.status} - ${response.statusText} `)
    }

    try {
        const deposition: DepositionsResponse = await response.json()
        console.log(`Created new record ${deposition.record_id}.`)
        return deposition.record_id
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`)
    }
}
