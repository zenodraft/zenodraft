import { deposition_show_details } from './../../deposition/show/details'



export const deposition_show_draft = async (token: string, sandbox: boolean, concept_id: string, verbose = false): Promise<string> => {
    const deposition = await deposition_show_details(token, sandbox, concept_id, 'concept', verbose)
    let latest_draft_id: string
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0]
    } else {
        throw new Error(`There are no draft depositions in concept ${concept_id}.`)
    }
    return latest_draft_id
}
