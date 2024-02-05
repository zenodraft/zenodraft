import { default as fetch } from 'node-fetch'
import { AnyDeposition, HasDraft } from '../../helpers/deposition-types'
import { helpers_get_api } from '../../helpers/get-api'



export const deposition_create_concept = async (token: string, sandbox: boolean, verbose = false): Promise<string> => {
    const msg = `creating a new, empty version in a new concept...`
    if (verbose) {
        console.log(msg)
    }
    const api = helpers_get_api(sandbox)
    const url = `${api}'/deposit/depositions'`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    if (response.ok !== true) {
        throw new Error(`(errid 11) Something went wrong on 'POST' to ${url}: ${response.status} - ${response.statusText}`)
    }
    const deposition: AnyDeposition & HasDraft = await response.json()
    if (verbose) {
        console.log(`${msg}done. id=${deposition.record_id}`)
    }
    return deposition.record_id.toString()
}
