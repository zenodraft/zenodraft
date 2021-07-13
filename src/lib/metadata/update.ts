import { default as fetch, RequestInit } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'
import { AnyDeposition } from '../helpers/deposition-types'
import { helpers_get_api } from '../helpers/get-api'
import * as fs from 'fs'
import * as path from 'path'



export const metadata_update = async (token: string, sandbox: boolean, id: string, filename?: string, verbose = false): Promise<void> => {
    if (verbose) {
        if (filename === undefined) {
            console.log(`clearing metadata from deposition with id ${id}...`)
        } else {
            console.log(`adding metadata from ${filename} to deposition with id ${id}...`)
        }
    }
    // this next call can throw if there is an inconsistency
    await deposition_show_details(token, sandbox, id, 'deposition', verbose)

    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${id}`
    const method = 'PUT'
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const minimal_metadata_filename = path.join(__dirname, '..', '..', '..', 'assets', '.zenodo.json.empty')
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'))
    const user_metadata = filename === undefined ? {} : JSON.parse(fs.readFileSync(filename, 'utf8'))
    const metadata = {...minimal_metadata, ...user_metadata}
    const init: RequestInit = { method, headers, body: JSON.stringify({metadata}) }
    let response: any
    try {
        response = await fetch(`${api}${endpoint}`, init)
        if (response.ok !== true) {
            throw new Error('Response was not OK')
        }
    } catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`)
    }

    try {
        const deposition: AnyDeposition = await response.json()
        if (verbose) {
            console.log(`Updated record ${deposition.record_id}.`)
        }
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`)
    }
}
