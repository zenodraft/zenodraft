import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import * as fs from 'fs'
import { get_deposition_details } from './get-deposition-details'


export const add_file_to_deposition = async (api: string, access_token: string, id: string, filename: string): Promise<void> => {
    console.log(`adding file ${filename} to deposition with id ${id}...`)
    const deposition = await get_deposition_details(api, access_token, id)
    const bucket = deposition.links.bucket
    console.log(bucket)

    const stream = fs.createReadStream(filename);
    const method = 'PUT'
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'text/plain',
        'Content-Length': (fs.statSync(filename).size).toString()
    }
    const init: RequestInit = { method, headers, body: stream }
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
