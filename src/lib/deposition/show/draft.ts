import { helpers_get_api } from '../../helpers/get-api'
import { default as fetch } from 'node-fetch'
import * as assert from 'assert'


export const deposition_show_draft = async (token: string, sandbox: boolean, concept_id: string, verbose = false): Promise<string> => {
    const api = helpers_get_api(sandbox)
    const endpoint = '/deposit/depositions'
    const url = `${api}${endpoint}`
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(url, { method: 'GET', headers })
    const depositions = await response.json()
    assert(depositions.constructor == Array, "Expected depositions to be an Array")
    if (depositions.length == 0) {
        throw new Error('(errid 5) You have no depositions yet')
    }
    const filtered = depositions.filter(deposition => deposition.conceptrecid === concept_id)
    if (filtered.length === 0) {
        throw new Error(`(errid 6) You have no depositions within concept ${concept_id}.`)
    }
    if (filtered.length > 1) {
        throw new Error(`(errid 7) Something went wrong getting the id for the latest draft for concept ${concept_id}.`)
    }
    if ('latest_draft' in filtered[0].links === false) {
        return ''
    }
    return filtered[0].links.latest_draft.split('/').slice(-1)[0]
}
