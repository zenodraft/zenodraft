import { helpers_get_api } from '../../helpers/get-api'
import { default as fetch } from 'node-fetch'
import * as assert from 'assert'


export const deposition_show_latest = async (token: string, sandbox: boolean, concept_id: string, verbose = false): Promise<string> => {

    const api = helpers_get_api(sandbox)
    const endpoint = '/deposit/depositions'
    const url = `${api}${endpoint}`
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(url, { method: 'GET', headers })
    const depositions = await response.json()
    assert(depositions.constructor == Array && depositions.length > 0, "depositions is not an array or is array of length 0")
    const filtered = depositions.filter(deposition => deposition.conceptrecid === concept_id)
    if (filtered.length === 0) {
        throw new Error(`There are no draft depositions in concept ${concept_id}.`)
    } else if (filtered.length === 1) {
        return filtered[0].record_id.toString()
    } else {
        throw new Error(`Something went wrong getting the id for the latest published version for concept ${concept_id}.`)
    }
}
