import { default as fetch } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'
import { helpers_get_api } from '../helpers/get-api'
import * as fs from 'fs'
import { metadata_validate } from '../metadata/validate'



export const metadata_update = async (token: string, sandbox: boolean, version_id: string, filename?: string, verbose = false): Promise<void> => {
    const msg_clearing = `clearing metadata from deposition with id ${version_id}...`
    const msg_updating = `adding metadata from ${filename} to deposition with id ${version_id}...`
    if (verbose) {
        if (filename === undefined) {
            console.log(msg_clearing)
        } else {
            console.log(msg_updating)
        }
    }
    if (filename !== undefined) {
        metadata_validate(filename, verbose)
    }
    const deposition = await deposition_show_details(token, sandbox, version_id, verbose)
    const api = helpers_get_api(sandbox)
    const url = `${api}/deposit/depositions/${version_id}`
    const user_metadata = filename === undefined ? {} : JSON.parse(fs.readFileSync(filename, 'utf8'))
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            metadata: {
                "title": `Untitled in ${deposition.conceptrecid}`,
                ...user_metadata
            }
        })
    })
    if (response.ok !== true) {
        throw new Error(`(errid 13) Something went wrong on PUT to ${url}: ${response.status} - ${response.statusText}`)
    }
    if (verbose) {
        if (filename === undefined) {
            console.log(`${msg_clearing}done`)
        } else {
            console.log(`${msg_updating}done`)
        }
    }
}
