import { deposition_show_details } from '../../deposition/show/details'
import { DepositionsResponse } from '../../helpers/zenodo-response-types'
import { file_delete } from '../../file/delete'
import { helpers_get_api } from '../../helpers/get-api'
import { metadata_update } from '../../metadata/update'
import { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'



export const deposition_create_in_existing_collection = async (token: string, sandbox: boolean, collection_id: string, verbose = false): Promise<string> => {
    if (verbose) {
        console.log(`creating a new, empty versioned deposition in existing collection...`)
    }
    const deposition = await deposition_show_details(token, sandbox, collection_id, 'collection', verbose)
    const latest_id = deposition.links.latest.split('/').slice(-1)[0]
    const new_id = await create_new_versioned_deposition(token, sandbox, latest_id, verbose)
    await remove_files_from_draft(token, sandbox, new_id, verbose)
    await metadata_update(token, sandbox, new_id, undefined, verbose)
    return new_id
}


const create_new_versioned_deposition = async (token: string, sandbox: boolean, latest_id: string, verbose = false): Promise<string> => {
    if (verbose) {
        console.log(`creating a new version off of latest version in collection...`)
    }
    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${latest_id}/actions/newversion`
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${token}`
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
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`)
    }
    try {
        const deposition: DepositionsResponse = await response.json()
        const new_id = deposition.links.latest_draft!.split('/').slice(-1)[0]
        if (verbose) {
            console.log(`created new record ${new_id}`)
        }
        console.log(`${new_id}`)
        return new_id
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json.`)
    }
}


const remove_files_from_draft = async (token: string, sandbox: boolean, id: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`removing any files from the newly drafted version...`)
    }
    const deposition = await deposition_show_details(token, sandbox, id, 'deposition', verbose)
    const filenames = deposition.files.map((file) => {return file.filename})
    for (const filename of filenames) {
        file_delete(token, sandbox, id, filename)
    }
}
