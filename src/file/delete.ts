import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { get_deposition_details } from '../deposition/show/details'
import { get_access_token_from_environment } from '../helpers/get-access-token-from-environment'


export const file_delete = async (sandbox: boolean, id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${id}...`)
    }
    const access_token = get_access_token_from_environment(sandbox)
    const deposition = await get_deposition_details(sandbox, id)
    const bucket = deposition.links.bucket
    const method = 'DELETE'
    const headers = {
        'Authorization': `Bearer ${access_token}`
    }
    const init: RequestInit = { method, headers }
    let response: any
    try {
        response = await fetch(`${bucket}/${filename}`, init)
        if (response.ok !== true) {
            throw new Error()
        }
    } catch (e) {
        console.debug(response)
        throw new Error(`Something went wrong on PUT to ${bucket}/${filename}: ${response.status} - ${response.statusText} `)
    }
}
