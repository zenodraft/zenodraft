import { default as fetch } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'
import { File } from '../helpers/deposition-types'


export const file_delete = async (token: string, sandbox: boolean, id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${id}...`)
    }
    const deposition = await deposition_show_details(token, sandbox, id, 'version', verbose)
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const url1 = `${deposition.links.files}`
    const response1 = await fetch(url1, { method: 'GET', headers })
    if (response1.ok !== true) {
        throw new Error(`Something went wrong on GET to ${url1}: ${response1.status} - ${response1.statusText} `)
    }
    const files: File[] = await response1.json()
    const fileid = files.filter(file => file.filename == filename)[0].id

    const url2 = `${deposition.links.files}/${fileid}`
    const response2 = await fetch(url2, { method: 'DELETE', headers })
    if (response2.ok !== true) {
        throw new Error(`Something went wrong on DELETE to ${url2}: ${response2.status} - ${response2.statusText} `)
    }
}
