import { deposition_show_details } from './../../deposition/show/details'



export const deposition_show_latest = async (token: string, sandbox: boolean, collection_id: string, verbose = false): Promise<string> => {
    const deposition = await deposition_show_details(token, sandbox, collection_id, 'collection', verbose)
    let latest_id: string
    if ('latest' in deposition.links && deposition.links.latest !== undefined) {
        latest_id = deposition.links.latest.split('/').slice(-1)[0]
    } else {
        throw new Error(`There are no published versions in collection ${collection_id}.`)
    }
    return latest_id
}
