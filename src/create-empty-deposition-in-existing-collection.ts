import { get_deposition_details } from './get-deposition-details.js'
import { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'
import { DepositionsResponse } from './zenodo-response-types.js'
import { delete_deposition_file } from './delete-deposition-file.js'
import { update_deposition_metadata } from './update-deposition-metadata.js'
import { get_access_token_from_environment } from './get-access-token-from-environment.js'
import { get_api } from './get-api.js'


export const create_empty_deposition_in_existing_collection = async (sandbox: boolean, collection_id: string): Promise<string> => {
    console.log(`creating a new, empty versioned deposition in existing collection...`)
    await validate_in_collection_value(sandbox, collection_id)
    const latest_id = await get_id_for_latest_version_in_collection(sandbox, collection_id)
    const new_id = await create_new_versioned_deposition(sandbox, latest_id)
    await remove_files_from_draft(sandbox, new_id)
    await update_deposition_metadata(sandbox, new_id)
    return new_id
}


const create_new_versioned_deposition = async (sandbox: boolean, latest_id: string): Promise<string> => {
    console.log(`creating a new version off of latest version in collection...`)
    const access_token = get_access_token_from_environment(sandbox)
    const api = get_api(sandbox)
    const endpoint = `/deposit/depositions/${latest_id}/actions/newversion`
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${access_token}`
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
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText} \n\n\n ${e}`)
    }
    try {
        const deposition: DepositionsResponse = await response.json()
        const new_id = deposition.links.latest_draft.split('/').slice(-1)[0]
        console.log(`created new record ${new_id}`)
        return new_id
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`)
    }
}


const get_id_for_latest_version_in_collection = async (sandbox: boolean, collection_id: string): Promise<string> => {
    console.log(`getting id of the latest version in the collection...`)
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await get_deposition_details(sandbox, id)
    const latest_id = deposition.links.latest.split('/').slice(-1)[0]
    return latest_id
}


const remove_files_from_draft = async (sandbox: boolean, id: string): Promise<void> => {
    console.log(`removing any files from the newly drafted version...`)
    const deposition = await get_deposition_details(sandbox, id)
    const filenames = deposition.files.map((file) => {return file.filename})
    for (const filename of filenames) {
        delete_deposition_file(sandbox, id, filename)
    }
}


const validate_in_collection_value = async (sandbox: boolean, collection_id: string): Promise<void> => {
    console.log(`checking that the collection_id value resolves to a concept, not a version...`)
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await get_deposition_details(sandbox, id)
    if (deposition.conceptrecid !== collection_id) {
        throw new Error('Deposition id should be a concept id.')
    }
}
