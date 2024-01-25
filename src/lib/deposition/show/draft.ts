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
    const drafts = await response.json()
    assert(drafts.constructor == Array && drafts.length > 0, "drafts is not an array or is array of length 0")
    const filtered = drafts.filter(draft => draft.conceptrecid === concept_id)
    if (filtered.length === 0) {
        throw new Error(`There are no draft depositions in concept ${concept_id}.`)
    } else if (filtered.length === 1) {
        return filtered[0].id.toString()
    } else {
        throw new Error(`Something went wrong getting the id for the latest draft for concept ${concept_id}.`)
    }
}
