import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import * as fs from 'fs'
import { deposition_show_details } from '../deposition/show/details'
import * as mime from 'mime-types'
import { get_access_token_from_environment } from '../helpers/get-access-token-from-environment'


export const file_add = async (sandbox: boolean, id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`adding file ${filename} to deposition with id ${id}...`)
    }
    const access_token = get_access_token_from_environment(sandbox)
    const deposition = await deposition_show_details(sandbox, id)
    const bucket = deposition.links.bucket
    const content_type: string = mime.contentType(filename) ? mime.contentType(filename) as string : 'text/plain'
    const stream = fs.createReadStream(filename);
    const method = 'PUT'
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': content_type,
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
        throw new Error(`Something went wrong on ${method} to ${bucket}/${filename}: ${response.status} - ${response.statusText} `)
    }
}
