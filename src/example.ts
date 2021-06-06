import { create_empty_deposition_in_existing_collection } from './create-empty-deposition-in-existing-collection.js'
import { add_file_to_deposition } from './add-file-to-deposition.js'
import { update_deposition_metadata } from './update-deposition-metadata.js'


(async () => {
    const sandbox: boolean = true
    const collection_id = '831247'
    const id = await create_empty_deposition_in_existing_collection(sandbox, collection_id)
    for (const filename of ['data.txt', 'data.pdf']) {
        await add_file_to_deposition(sandbox, id, filename)
    }
    await update_deposition_metadata(sandbox, id)
})()
