
import { DepositionsResponse } from '../helpers/zenodo-response-types'
import { helpers_get_api } from '../helpers/get-api'
import { helpers_get_record_type } from '../helpers/get-record-type'
import { RequestInit } from 'node-fetch'
import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import fetch from 'node-fetch'



export const metadata_update = async (token: string, sandbox: boolean, id: string, filename?: string, verbose = false): Promise<void> => {
    if (verbose) {
        if (filename === undefined) {
            console.log(`clearing metadata from deposition with id ${id}...`)
        } else {
            console.log(`adding metadata from ${filename} to deposition with id ${id}...`)
        }
    }
    const record_type = await helpers_get_record_type(token, sandbox, id, verbose)
    assert(record_type === 'deposition', 'Input id is not a deposition.')
    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${id}`
    const method = 'PUT'
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const minimal_metadata_filename = path.join(__dirname, '..', '..', 'assets', '.zenodo.json.empty')
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'))
    const user_metadata = filename === undefined ? {} : JSON.parse(fs.readFileSync(filename as string, 'utf8'))
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
        const deposition: DepositionsResponse = await response.json()
        if (verbose) {
            console.log(`Updated record ${deposition.record_id}.`)
        }
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`)
    }
}
