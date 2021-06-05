import { get_deposition_details } from './get-deposition-details'
import { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'
import { DepositionsResponse } from './zenodo-response-types'
import { delete_deposition_file } from './delete-deposition-file'
import { update_deposition_metadata } from './update-deposition-metadata'


export const create_empty_deposition_in_existing_collection = async (api: string, access_token: string, collection_id: string): Promise<string> => {
    console.log(`creating a new, empty versioned deposition in existing collection...`)
    await validate_in_collection_value(api, access_token, collection_id)
    const latest_id = await get_id_for_latest_version_in_collection(api, access_token, collection_id)
    const new_id = await create_new_versioned_deposition(api, access_token, latest_id)
    await remove_files_from_draft(api, access_token, new_id)
    await update_deposition_metadata(api, access_token, new_id, '.zenodo.json.empty')
    return new_id
}


const create_new_versioned_deposition = async (api: string, access_token: string, latest_id: string): Promise<string> => {
    console.log(`creating a new version off of latest version in collection...`)
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


const get_id_for_latest_version_in_collection = async (api: string, access_token: string, collection_id: string): Promise<string> => {
    console.log(`getting id of the latest version in the collection...`)
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await get_deposition_details(api, access_token, id)
    const latest_id = deposition.links.latest.split('/').slice(-1)[0]
    return latest_id
}


const remove_files_from_draft = async (api: string, access_token: string, id: string): Promise<void> => {
    console.log(`removing any files from the newly drafted version...`)
    const deposition = await get_deposition_details(api, access_token, id)
    const filenames = deposition.files.map((file) => {return file.filename})
    for (const filename of filenames) {
        delete_deposition_file(api, access_token, id, filename)
    }
}


const validate_in_collection_value = async (api: string, access_token: string, collection_id: string): Promise<void> => {
    console.log(`checking that the collection_id value resolves to a concept, not a version...`)
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await get_deposition_details(api, access_token, id)
    if (deposition.conceptrecid !== collection_id) {
        throw new Error('Deposition id should be a concept id.')
    }
}
