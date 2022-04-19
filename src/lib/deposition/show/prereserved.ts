import { deposition_show_details } from './../../deposition/show/details'



export const deposition_show_prereserved = async (token: string, sandbox: boolean, latest_id: string, verbose = false): Promise<string> => {
    const deposition = await deposition_show_details(token, sandbox, latest_id, 'version', verbose)
    return deposition.metadata.prereserve_doi.doi
}
