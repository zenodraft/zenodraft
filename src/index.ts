import * as dotenv from 'dotenv'
import { create_empty_deposition } from './create-empty-deposition'
import { add_file_to_deposition } from './add-file-to-deposition'
import { update_deposition_metadata } from './update-deposition-metadata'
import { delete_deposition_file } from './delete-deposition-file'


(async () => {
    const sandbox: boolean = true
    const access_token: string = dotenv.config().parsed!.ZENODO_SANDBOX_ACCESS_TOKEN
    const api: string = `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`

    const filenames = [
        'data.txt',
        'data2.txt'
    ]

    const collection_id = '831247'
    const id = await create_empty_deposition(api, access_token, collection_id)
    for (const filename of filenames) {
        await add_file_to_deposition(api, access_token, id, filename)
    }
    await update_deposition_metadata(api, access_token, id)

    await delete_deposition_file(api, access_token, id, 'data2.txt')

})()
