import { default as fetch, Response } from 'node-fetch'
import { AnyDeposition } from './../../helpers/deposition-types'
import { helpers_get_api } from './../../helpers/get-api'
import * as assert from 'assert'


export const deposition_show_details = async (token: string,
                                              sandbox: boolean,
                                              id: string,
                                              verbose = false): Promise<AnyDeposition> => {
    const regex = /^[\d]+$/
    assert(regex.test(id) === true, 'id has invalid format.')
    const api = helpers_get_api(sandbox)
    const url = `${api}/deposit/depositions/${id}`
    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if (response.ok !== true) {
        throw new Error(`(errid 8) Something went wrong on GET to ${url}: ${response.status} - ${response.statusText}`)
    }
    return await response.json()
}
