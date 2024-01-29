import { default as fetch, Response, RequestInit } from 'node-fetch'
import { AnyDeposition } from './../../helpers/deposition-types'
import { helpers_get_api } from './../../helpers/get-api'
import * as assert from 'assert'


export const deposition_show_details = async (token: string,
                                              sandbox: boolean,
                                              id: string,
                                              verbose = false): Promise<AnyDeposition> => {

    if (verbose) {
        console.log(`Getting details for version with id ${id}...`)
    }
    const regex = /^[\d]+$/
    assert(regex.test(id) === true, 'id has invalid format.')
    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${id}`
    const method = 'GET'
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const init: RequestInit = { method, headers }
    let response: Response
    response = await fetch(`${api}${endpoint}`, init)
    if (response.ok !== true) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText}`)
    }
    return await response.json()
}
