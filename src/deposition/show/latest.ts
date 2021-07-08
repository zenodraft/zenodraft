import { deposition_show_details } from './../../deposition/show/details'



export const deposition_show_latest = async (token: string, sandbox: boolean, collection_id: string, verbose = false): Promise<string> => {
    const deposition = await deposition_show_details(token, sandbox, collection_id, 'collection', verbose)
    let latest_draft_id: string
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0]
    } else {
        latest_draft_id = ''
    }
    return latest_draft_id
}
