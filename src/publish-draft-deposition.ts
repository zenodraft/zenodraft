import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'


export const publish_draft_deposition = async (api: string, access_token: string, id: string): Promise<void> => {
    console.log(`publishing draft deposition with id ${id}...`)
    const endpoint = `/deposit/depositions/${id}/actions/publish`
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${access_token}`
    }
    const init: RequestInit = { method, headers }
    let response: any
    try {
        response = await fetch(`${api}${endpoint}`, init)
        if (response.ok !== true) {
            throw new Error()
        }
    } catch (e) {
        console.debug(response)
        throw new Error(`Something went wrong on POST to ${api}${endpoint}: ${response.status} - ${response.statusText} \n\n\n ${e}`)
    }
}
