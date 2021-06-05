import * as dotenv from 'dotenv'
import { create_empty_deposition_in_existing_collection } from './create-empty-deposition-in-existing-collection'
import { add_file_to_deposition } from './add-file-to-deposition'
import { update_deposition_metadata } from './update-deposition-metadata'


(async () => {
    const sandbox: boolean = true
    const access_token: string = dotenv.config().parsed!.ZENODO_SANDBOX_ACCESS_TOKEN
    const api: string = `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`

    const collection_id = '831247'
    const id = await create_empty_deposition_in_existing_collection(api, access_token, collection_id)
    for (const filename of ['data.txt', 'data.pdf']) {
        await add_file_to_deposition(api, access_token, id, filename)
    }
    await update_deposition_metadata(api, access_token, id)
})()
