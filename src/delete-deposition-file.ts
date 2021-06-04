import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { get_deposition_details } from './get-deposition-details'


export const delete_deposition_file = async (api: string, access_token: string, id: string, filename: string): Promise<void> => {
    console.log(`deleting file ${filename} from deposition with id ${id}...`)
    const deposition = await get_deposition_details(api, access_token, id)
    const bucket = deposition.links.bucket
    console.log(bucket)

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
