const create_new_versioned_deposition = async (id: string): Promise<string> => {
    console.log(`TODO: create a new version off of latest version in collection...`)
    return 'the deposition id'
}


export const create_empty_deposition_in_existing_collection = async (api: string, access_token: string, collection_id: string): Promise<string> => {
    console.log(`creating a new, empty versioned deposition in existing collection...`)
    await validate_in_collection_value(collection_id)
    const latest_version_id = await retrieve_latest_version_in_collection(collection_id)
    const id = await create_new_versioned_deposition(latest_version_id)
    await remove_files_from_draft()
    await remove_metadata_from_draft()
    return id
}


const remove_files_from_draft = async (): Promise<void> => {
    console.log(`TODO: removing the files from the newly drafted version...`)
}


const remove_metadata_from_draft = async (): Promise<void> => {
    console.log(`TODO: remove the metadata from the newly drafted version...`)
}


const retrieve_latest_version_in_collection = async (collection_id: string): Promise<string> => {
    console.log(`TODO: check what the latest version is of the collection...`)
    return 'zenodo record id of latest version in collection'
}


const validate_in_collection_value = async (collection_id: string): Promise<void> => {
    console.log(`TODO: check that the collection_id value resolves to a concept, not a version...`)
}
