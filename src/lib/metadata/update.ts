import { default as fetch, RequestInit } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'
import { AnyDeposition } from '../helpers/deposition-types'
import { helpers_get_api } from '../helpers/get-api'
import * as fs from 'fs'
import * as path from 'path'



export const metadata_update = async (token: string, sandbox: boolean, version_id: string, filename?: string, verbose = false): Promise<void> => {
    if (verbose) {
        if (filename === undefined) {
            console.log(`Clearing metadata from deposition with id ${version_id}...`)
        } else {
            console.log(`Adding metadata from ${filename} to deposition with id ${version_id}...`)
        }
    }
    // this next call can throw if there is an inconsistency
    await deposition_show_details(token, sandbox, version_id, verbose)

    const api = helpers_get_api(sandbox)
    const url = `${api}/deposit/depositions/${version_id}`
    const minimal_metadata_filename = path.join(__dirname, '..', '..', '..', 'assets', '.zenodo.json.empty')
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'))
    const user_metadata = filename === undefined ? {} : JSON.parse(fs.readFileSync(filename, 'utf8'))
    const metadata = {...minimal_metadata, ...user_metadata}

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({metadata})
    })
    if (response.ok !== true) {
        throw new Error(`(errid 13) Something went wrong on PUT to ${url}: ${response.status} - ${response.statusText}`)
    }
    const deposition: AnyDeposition = await response.json()
    if (verbose) {
        if (filename === undefined) {
            console.log(`Clearing metadata from deposition with id ${version_id}...done`)
        } else {
            console.log(`Adding metadata from ${filename} to deposition with id ${version_id}...done`)
        }
    }
}
