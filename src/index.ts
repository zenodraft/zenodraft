import * as dotenv from 'dotenv'
import fetch from 'node-fetch'


const create_new_empty_upload = async (api: string, access_token: string) => {
    try {
        const endpoint = '/deposit/depositions'
        const init = {
            body: {},
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-type': 'application/json'
            },
            method: 'POST'
        }
        const response = await fetch(api + endpoint, init as any)
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}


(async () => {
    const sandbox: boolean = true
//    const conceptdoi: string = '10.5281/zenodo.831247'
    const access_token: string = dotenv.config().parsed!.ZENODO_SANDBOX_ACCESS_TOKEN
    const api: string = `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`
    
    const response = await create_new_empty_upload(api, access_token)
    console.log(response)

})()
