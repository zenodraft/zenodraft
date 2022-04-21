import { default as fetch, RequestInit } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'



export const file_delete = async (token: string, sandbox: boolean, id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${id}...`)
    }
    const deposition = await deposition_show_details(token, sandbox, id, 'version', verbose)
    const bucket = deposition.links.bucket
    const method = 'DELETE'
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const init: RequestInit = { method, headers }
    let response: any
    try {
        response = await fetch(`${bucket}/${filename}`, init)
        if (response.ok !== true) {
            throw new Error()
        }
    } catch (e) {
        throw new Error(`Something went wrong on ${method} to ${bucket}/${filename}: ${response.status} - ${response.statusText} `)
    }
}
