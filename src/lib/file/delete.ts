import { default as fetch } from 'node-fetch'
import { deposition_show_details } from '../deposition/show/details'
import { File } from '../helpers/deposition-types'


export const file_delete = async (token: string, sandbox: boolean, version_id: string, filename: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${version_id}...`)
    }
    const deposition = await deposition_show_details(token, sandbox, version_id, verbose)
    const response1 = await fetch(deposition.links.files, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if (response1.ok !== true) {
        throw new Error(`(errid 1) Something went wrong on GET to ${deposition.links.files}: ${response1.status} - ${response1.statusText} `)
    }
    const files: File[] = await response1.json()
    const filtered = files.filter(file => file.filename === filename)
    if (filtered.length === 0) {
        throw new Error(`(errid 2) There's no file named '${filename}' in deposition with id ${version_id}.`)
    }
    const fileid = filtered[0].id

    const response2 = await fetch(`${deposition.links.files}/${fileid}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if (response2.ok !== true) {
        throw new Error(`(errid 3) Something went wrong on DELETE to ${deposition.links.files}/${fileid}: ${response2.status} - ${response2.statusText} `)
    }
    if (verbose) {
        console.log(`deleting file ${filename} from deposition with id ${version_id}...done`)
    }
}
