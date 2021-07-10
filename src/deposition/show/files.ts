import { deposition_show_details } from './../../deposition/show/details'
import { File } from '../../helpers/deposition-types'


export const deposition_show_files = async (token: string, sandbox: boolean, record_id: string, verbose = false): Promise<string[]> => {
    const deposition = await deposition_show_details(token, sandbox, record_id, 'deposition', verbose)
    return deposition.files.map((file: File) => {
        return file.filename
    })
}
