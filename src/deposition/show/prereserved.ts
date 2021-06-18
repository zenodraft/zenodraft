import { deposition_show_details } from './details'


export const get_prereserved = async (sandbox: boolean, latest_id: string, verbose = false): Promise<string> => {
    const deposition = await deposition_show_details(sandbox, latest_id, verbose)
    return deposition.metadata.prereserve_doi.doi
}
