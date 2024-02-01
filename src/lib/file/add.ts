import { default as fetch, RequestInit } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'
import * as fs from 'fs'



export const file_add = async (token: string, sandbox: boolean, version_id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`adding file ${filename} to deposition with id ${version_id}...`)
    }
    const deposition = await deposition_show_details(token, sandbox, version_id, verbose)
    const bucket = deposition.links.bucket
    const stream = fs.createReadStream(filename);
    const method = 'PUT'
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': (fs.statSync(filename).size).toString()
    }
    const init: RequestInit = { method, headers, body: stream }
    const response = await fetch(`${bucket}/${filename}`, init)
    if (response.ok !== true) {
        throw new Error(`(errid 4) Something went wrong on ${method} to ${bucket}/${filename}: ${response.status} - ${response.statusText}`)
    }
    if (verbose) {
        console.log(`adding file ${filename} to deposition with id ${version_id}...done`)
    }
}
