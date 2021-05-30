import * as dotenv from 'dotenv'
import { create_new_empty_upload } from './create-new-empty-upload'


(async () => {
    const sandbox: boolean = true
    const access_token: string = dotenv.config().parsed!.ZENODO_SANDBOX_ACCESS_TOKEN
    const api: string = `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`
    const response = await create_new_empty_upload(api, access_token)
    console.log(response)
})()
