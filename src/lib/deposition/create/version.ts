import { default as fetch } from 'node-fetch'
import { deposition_show_files } from '../../deposition/show/files'
import { AnyDeposition, HasLatest, HasDraft } from '../../helpers/deposition-types'
import { file_delete } from '../../file/delete'
import { helpers_get_api } from '../../helpers/get-api'
import { metadata_update } from '../../metadata/update'
import { delay } from '../../helpers/delay'



export const deposition_create_version = async (token: string, sandbox: boolean, concept_id: string, verbose = false): Promise<string> => {
    if (verbose) {
        console.log(`Creating a new, empty version in existing concept ${concept_id}...`)
    }
    const new_id = await create_new_versioned_deposition(token, sandbox, concept_id, verbose)
    await remove_files_from_draft(token, sandbox, new_id, verbose)
    await metadata_update(token, sandbox, new_id, undefined, verbose)
    if (verbose) {
        console.log(`Creating a new, empty version in existing concept ${concept_id}...done. id=${new_id}`)
    }
    return new_id
}


const create_new_versioned_deposition = async (token: string, sandbox: boolean, concept_id: string, verbose = false): Promise<string> => {
    const first_id = (parseInt(concept_id) + 1).toString()
    const api = helpers_get_api(sandbox)
    const endpoint = `/deposit/depositions/${first_id}/actions/newversion`
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const url = `${api}${endpoint}`
    const response = await fetch(url, { method: 'POST', headers })
    if (response.ok !== true) {
        throw new Error(`(errid 12) Something went wrong on POST to ${url}: ${response.status} - ${response.statusText}`)
    }
    const deposition: AnyDeposition & HasLatest & HasDraft = await response.json()
    const new_id = deposition.links.latest_draft.split('/').slice(-1)[0]

    // waiting 5000 milliseconds in an attempt to avoid possible server-side async
    // problems; havent seen any similar problems with deposition_create_concept
    await delay(5000)

    return new_id
}


const remove_files_from_draft = async (token: string, sandbox: boolean, id: string, verbose = false): Promise<void> => {
    if (verbose) {
        console.log(`Removing any files from the newly drafted version...`)
    }
    const filenames = await deposition_show_files(token, sandbox, id, verbose)
    for (const filename of filenames) {
        file_delete(token, sandbox, id, filename)
    }
    if (verbose) {
        console.log(`Removing any files from the newly drafted version...done`)
    }
}
