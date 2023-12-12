import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'
import { helpers_get_access_token_from_environment } from '../helpers/get-access-token-from-environment'


export const file_delete_by_fileid = async (sandbox: boolean, id: string, fileid: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`deleting file ${fileid} from deposition with id ${id}...`)
    }
    const access_token = helpers_get_access_token_from_environment(sandbox)
    const deposition = await deposition_show_details(sandbox, id)
    const files = deposition.links.files

    if (verbose) {
        console.log(`using ${files} in id ${id}...`)
    }
    
    const method = 'DELETE'
    const headers = {
        'Authorization': `Bearer ${access_token}`
    }
    const init: RequestInit = { method, headers }
    let response: any
    try {
        //response = await fetch(`${bucket}/${fileid}`, init)
	response = await fetch(`${files}/${fileid}`, init)
        if (response.ok !== true) {
            throw new Error()
        }
    } catch (e) {
        console.debug(response)
        throw new Error(`Something went wrong on PUT to ${files}/${fileid}: ${response.status} - ${response.statusText} `)
    }
}


export const file_delete = async (sandbox: boolean, id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${id}...`)
    }
    const access_token = helpers_get_access_token_from_environment(sandbox)
    const deposition = await deposition_show_details(sandbox, id)
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
