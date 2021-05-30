import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { DepositionsResponse } from './zenodo-response-types'


const create_new_empty_upload = async (api: string, access_token: string) => {
    
    const endpoint = '/deposit/depositions'
    const method = 'POST'
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const init: RequestInit = { method, headers, body: JSON.stringify({}) }
    let response: any
    try {
        response = await fetch(api + endpoint, init)
    } catch (e) {
        throw new Error(`Didn't get the expected response from ${api}${endpoint}: ${response.status} - ${response.statusText} `)
    }

    try {
        return await response.json() as DepositionsResponse
    } catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`)
    }
}


(async () => {
    const sandbox: boolean = true
    const access_token: string = dotenv.config().parsed!.ZENODO_SANDBOX_ACCESS_TOKEN
    const api: string = `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`
    const response = await create_new_empty_upload(api, access_token)
    console.log(response)
})()
