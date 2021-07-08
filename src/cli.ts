import * as commander from 'commander'
import { file_add } from './file/add'
import { deposition_create_in_existing_collection } from './deposition/create/in-existing-collection'
import { deposition_create_in_new_collection } from './deposition/create/in-new-collection'
import { file_delete } from './file/delete'
import { deposition_delete } from './deposition/delete'
import { deposition_show_details } from './deposition/show/details'
import { deposition_publish } from './deposition/publish'
import { metadata_update } from './metadata/update'
import { deposition_show_latest } from './deposition/show/latest'
import { deposition_show_prereserved } from './deposition/show/prereserved'
import { helpers_get_access_token_from_environment } from './helpers/get-access-token-from-environment'


export const cli = () => {

    const create = (() => {
        const create = new commander.Command('create')
        create.description('subcommands for creating a deposition')

        create
            .command('in-new-collection')
            .description('create a new draft deposition in a new collection')
            .action(async () => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    await deposition_create_in_new_collection(access_token, zenodraft.opts().sandbox, zenodraft.opts().verbose)
                } catch (e) {
                    console.error(e.message)
                }
            })

        create
            .command('in-existing-collection')
            .arguments('<collection_id>')
            .description('create a new draft deposition as a new version in an existing collection', {
                collection_id: 'id for the collection that the new deposition will be part of.'
            })
            .action(async (collection_id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    await deposition_create_in_existing_collection(access_token, zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose)
                } catch (e) {
                    console.error(e.message)
                }
            })

        return create

    })()


    const show = (() => {
        const show = new commander.Command('show')
        show.description('subcommands for showing information about a deposition')

        show
            .command('details')
            .arguments('<id>')
            .description('get details pertaining to deposition with id <id>', {
                id: 'deposition id'
            })
            .action(async (id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const details = await deposition_show_details(access_token, zenodraft.opts().sandbox, id, zenodraft.opts().verbose)
                    console.log(JSON.stringify(details, null, 4))
                } catch (e) {
                    console.error(e.message)
                }
            })

        show
            .command('latest')
            .arguments('<collection_id>')
            .description('get the latest draft deposition id of the collection with id <collection_id>', {
                collection_id: 'id of the collection whose latest draft we want to retrieve'
            })
            .action(async (collection_id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const latest_draft_id = await deposition_show_latest(access_token, zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose)
                    if (latest_draft_id === '') {
                        if (zenodraft.opts().verbose) {
                            console.log(`There are no drafts in collection ${collection_id}.`)
                        }
                    } else {
                        console.log(latest_draft_id)
                    }
                } catch (e) {
                    console.error(e.message)
                }
            })

        show
            .command('prereserved')
            .arguments('<latest_id>')
            .description('get the prereserved doi of the draft deposition with id <latest_id>', {
                latest_id: 'id of the deposition whose prereserved doi we want to retrieve'
            })
            .action(async (latest_id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const prereserved = await deposition_show_prereserved(access_token, zenodraft.opts().sandbox, latest_id, zenodraft.opts().verbose)
                    console.log(prereserved)
                } catch (e) {
                    console.error(e.message)
                }
            })

        return show

    })()

    const deposition = (() => {
        const deposition = new commander.Command('deposition')
        
        deposition.description('subcommands for depositions')

        deposition
            .addCommand(create)
            .addCommand(show)

        deposition
            .command('delete')
            .arguments('<id>')
            .description('delete draft deposition with id <id>', {
                id: 'deposition id'
            })
            .action(async (id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    await deposition_delete(access_token, zenodraft.opts().sandbox, id, zenodraft.opts().verbose)
                } catch (e) {
                    console.error(e.message)
                }
            })

        deposition
            .command('publish')
            .arguments('<id>')
            .description('publish draft deposition with id <id>', {
                id: 'deposition id'
            })
            .action(async (id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    await deposition_publish(access_token, zenodraft.opts().sandbox, id, zenodraft.opts().verbose)
                } catch (e) {
                    console.error(e.message)
                }
            })

        return deposition
    })()


    const file = (() => {
        const file = new commander.Command('file')
        
        file.description('subcommands for files')

        file
            .command('add')
            .arguments('<id> <filename>')
            .description('add a local file with filename <filename> to existing deposition with id <id>', {
                id: 'deposition id',
                filename: 'filename of the local file that is going to be added'
            })
            .action(async (id: string, filename: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    await file_add(access_token, zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose)
                } catch (e) {
                    console.error(e.message)
                }
            })

        file
            .command('delete')
            .arguments('<id> <filename>')
            .description('delete a file with filename <filename> from draft deposition with id <id>', {
                id: 'deposition id',
                filename: 'filename of the deposition file that is going to be deleted.'
            })
            .action(async (id: string, filename: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    await file_delete(access_token, zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose)
                } catch (e) {
                    console.error(e.message)
                }
            })

        return file
    })()


    const metadata = (() => {
        const metadata = new commander.Command('metadata')
        
        metadata.description('subcommands for metadata')

        metadata
            .command('update')
            .arguments('<id> <filename>')
            .description('update the metadata of an existing deposition with id <id> using the metadata from <filename>', {
                id: 'deposition id',
                filename: 'filename of file holding the metadata in Zenodo metadata format'
            })
            .action(async (id: string, filename: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    await metadata_update(access_token, zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose)
                } catch (e) {
                    console.error(e.message)
                }
            })
        metadata
            .command('clear')
            .arguments('<id>')
            .description('clear the metadata of an existing deposition with id <id>', {
                id: 'deposition id'
            })
            .action(async (id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    await metadata_update(access_token, zenodraft.opts().sandbox, id, undefined, zenodraft.opts().verbose)
                } catch (e) {
                    console.error(e.message)
                }
            })
        return metadata
    })()


    const zenodraft = new commander.Command('zenodraft')
        .version('0.10.0')
        .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
        .option('-s, --sandbox', 'run on zenodo sandbox instead of regular zenodo', false)
        .option('-v, --verbose', 'verbose mode', false)


        zenodraft
        .addCommand(deposition)
        .addCommand(file)
        .addCommand(metadata)
        .addHelpText('afterAll', '\n\n' +
        'All commands require a personal access token, which you can get here:' +
        '\n' +
        '\n- Zenodo Sandbox (testing): https://sandbox.zenodo.org/account/settings/applications' +
        '\n- Zenodo (production): https://zenodo.org/account/settings/applications' +
        '\n\nYou only need access tokens for the platforms you plan on using.\n\n')
        .parse(process.argv)

    return zenodraft
}
