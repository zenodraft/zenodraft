import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import * as fs from 'fs'
import { DepositionsResponse } from './zenodo-response-types.js'
import { get_access_token_from_environment } from './get-access-token-from-environment.js'
import { get_api } from './get-api.js'
import path from 'path'
import { fileURLToPath } from 'url'


export const update_deposition_metadata = async (sandbox: boolean, id: string, filename: string = '.zenodo.json'): Promise<void> => {
    console.log(`adding metadata from ${filename} to deposition with id ${id}...`)
    const access_token = get_access_token_from_environment(sandbox)
    const api = get_api(sandbox)
    const endpoint = `/deposit/depositions/${id}`
    const method = 'PUT'
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const here = fileURLToPath(import.meta.url)
    const parent = path.dirname(here)
    const minimal_metadata_filename = path.join(parent, '.zenodo.json.empty')
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'))
    const user_metadata = JSON.parse(fs.readFileSync(filename, 'utf8'))
    const init: RequestInit = { method, headers, body: JSON.stringify({...minimal_metadata, ...user_metadata}) }
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
        console.log(`Updated record ${deposition.record_id}.`)
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`)
    }
}
