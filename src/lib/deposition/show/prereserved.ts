import { deposition_show_details } from './../../deposition/show/details'



export const deposition_show_prereserved = async (token: string, sandbox: boolean, version_id: string, verbose = false): Promise<string> => {
    const deposition = await deposition_show_details(token, sandbox, version_id, verbose)
    return deposition.metadata.prereserve_doi.doi
}
