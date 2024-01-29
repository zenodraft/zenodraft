import { default as fetch, RequestInit } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'
import { helpers_get_api } from '../helpers/get-api'



export const deposition_publish = async (token: string, sandbox: boolean, version_id: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`publishing draft deposition with id ${version_id}...`)
    }

    // result of this next function is not used, but there are some checks in it
    await deposition_show_details(token, sandbox, version_id, verbose)

    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${version_id}/actions/publish`
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const init: RequestInit = { method, headers }
    let response: any
    response = await fetch(`${api}${endpoint}`, init)
    if (response.ok !== true) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`)
    }
}
