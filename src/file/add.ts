import { deposition_show_details } from '../deposition/show/details'
import { helpers_get_record_type } from '../helpers/get-record-type'
import { RequestInit } from 'node-fetch'
import * as assert from 'assert'
import * as fs from 'fs'
import * as mime from 'mime-types'
import fetch from 'node-fetch'



export const file_add = async (token: string, sandbox: boolean, id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`adding file ${filename} to deposition with id ${id}...`)
    }
    const record_type = await helpers_get_record_type(token, sandbox, id, verbose)
    assert(record_type === 'deposition', 'Input id is not a deposition.')
    const deposition = await deposition_show_details(token, sandbox, id)
    const bucket = deposition.links.bucket
    let content_type: string = mime.contentType(filename) ? mime.contentType(filename) as string : 'text/plain'
    if (content_type.includes('application/json')) {
        // zenodo declines json uploads with a 400 - BAD REQUEST,  
        // avoiding error by setting content type to plain text
        content_type = 'text/plain'
    }
    const stream = fs.createReadStream(filename);
    const method = 'PUT'
    const headers = {
        'Authorization': `Bearer ${token}`,
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
        throw new Error(`Something went wrong on ${method} to ${bucket}/${filename}: ${response.status} - ${response.statusText}`)
    }
}
