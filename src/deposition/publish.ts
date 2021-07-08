import { deposition_show_details } from '../deposition/show/details'
import { helpers_get_api } from '../helpers/get-api'
import { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'



export const deposition_publish = async (token: string, sandbox: boolean, id: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`publishing draft deposition with id ${id}...`)
    }

    await deposition_show_details(token, sandbox, id, 'deposition', verbose)

    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${id}/actions/publish`
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const init: RequestInit = { method, headers }
    let response: any
    try {
        response = await fetch(`${api}${endpoint}`, init)
        if (response.ok !== true) {
            throw new Error()
        }
    } catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`)
    }
}
