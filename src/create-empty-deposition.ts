import { create_empty_deposition_in_new_collection } from './create-empty-deposition-in-new-collection'
import { create_empty_deposition_in_existing_collection } from './create-empty-deposition-in-existing-collection'


export const create_empty_deposition = async (api: string, access_token: string, collection_id?: string): Promise<string> => {

    if (collection_id === undefined) {
        return await create_empty_deposition_in_new_collection(api, access_token)
    } else {
        return await create_empty_deposition_in_existing_collection(api, access_token, collection_id)
    }
}
