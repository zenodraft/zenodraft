import { DepositionsResponse } from './zenodo-response-types'
import fetch from 'node-fetch'
import {RequestInit} from 'node-fetch'


export const get_deposition_details = async (api: string, access_token: string, id: string): Promise<DepositionsResponse> => {
    console.log(`getting deposition details for deposition with id ${id}...`)
    const endpoint = `/deposit/depositions/${id}`
    const method = 'GET'
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const init: RequestInit = { method, headers }
    let response: any
    try {
        response = await fetch(`${api}${endpoint}`, init)
        if (response.ok !== true) {
            throw new Error()
        }
    } catch (e) {
        console.debug(response)
        throw new Error(`Something went wrong on GET to ${api}${endpoint}: ${response.status} - ${response.statusText} `)
    }

    try {
        const deposition: DepositionsResponse = await response.json()
        console.log(`Got details for pre-existing deposition with id ${id}.`)
        return deposition
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`)
    }    
}
