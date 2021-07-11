import { deposition_create_in_existing_collection } from './deposition/create/in-existing-collection'
import { deposition_create_in_new_collection } from './deposition/create/in-new-collection'
import { deposition_delete } from './deposition/delete'
import { deposition_publish } from './deposition/publish'
import { deposition_show_details } from './deposition/show/details'
import { deposition_show_draft } from './deposition/show/draft'
import { deposition_show_files } from './deposition/show/files'
import { deposition_show_latest } from './deposition/show/latest'
import { deposition_show_prereserved } from './deposition/show/prereserved'
import { file_add } from './file/add'
import { file_delete } from './file/delete'
import { helpers_get_access_token_from_environment } from './helpers/get-access-token-from-environment'
import { metadata_update } from './metadata/update'
import * as commander from 'commander'
import * as os from 'os'



export const cli = () => {

    const create = (() => {

        const cmd = new commander.Command('create')

        cmd.description('subcommands for creating a deposition')

        cmd.command('in-new-collection')
            .description('create a new draft deposition in a new collection')
            .action(async () => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const id = await deposition_create_in_new_collection(access_token, zenodraft.opts().sandbox, zenodraft.opts().verbose)
                    console.log(id)
                } catch (e) {
                    console.error(e.message)
                }
            })

        cmd.command('in-existing-collection')
            .arguments('<collection_id>')
            .description('create a new draft deposition as a new version in an existing collection', {
                collection_id: 'id for the collection that the new deposition will be part of.'
            })
            .action(async (collection_id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const id = await deposition_create_in_existing_collection(access_token, zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose)
                    console.log(id)
                } catch (e) {
                    console.error(e.message)
                }
            })

        return cmd

    })()


    const show = (() => {
        
        const cmd = new commander.Command('show')

        cmd.description('subcommands for showing information about a deposition')

        cmd.command('details')
            .arguments('<id>')
            .description('get details pertaining to deposition with id <id>', {
                id: 'deposition id'
            })
            .action(async (id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const details = await deposition_show_details(access_token, zenodraft.opts().sandbox, id, 'deposition', zenodraft.opts().verbose)
                    console.log(JSON.stringify(details, null, 4))
                } catch (e) {
                    console.error(e.message)
                }
            })

        cmd.command('draft')
            .arguments('<collection_id>')
            .description('get the draft deposition id of the collection with id <collection_id>', {
                collection_id: 'id of the collection for which we want to retrieve the draft id'
            })
            .action(async (collection_id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const draft_id = await deposition_show_draft(access_token, zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose)
                    console.log(draft_id)
                } catch (e) {
                    console.log('')
                    console.error(e.message)
                }
            })


        cmd.command('files')
            .arguments('<collection_id>')
            .description('get the filenames for the files in deposition with id <id>', {
                id: 'id of the deposition for which we want to retrieve the list of filenames'
            })
            .action(async (id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const filenames = await deposition_show_files(access_token, zenodraft.opts().sandbox, id, zenodraft.opts().verbose)
                    console.log(filenames.join(os.EOL))
                } catch (e) {
                    console.error(e.message)
                }
            })


        cmd.command('latest')
            .arguments('<collection_id>')
            .description('get the deposition id of the latest version in the collection with id <collection_id>', {
                collection_id: 'id of the collection whose latest version id we want to retrieve'
            })
            .action(async (collection_id: string) => {
                try {
                    const access_token = helpers_get_access_token_from_environment(zenodraft.opts().sandbox)
                    const latest_id = await deposition_show_latest(access_token, zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose)
                    console.log(latest_id)
                } catch (e) {
                    console.log('')
                    console.error(e.message)
                }
            })

        cmd.command('prereserved')
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

        return cmd

    })()

    const deposition = (() => {
        const cmd = new commander.Command('deposition')
        
        cmd.description('subcommands for depositions')

        cmd.addCommand(create)
            .addCommand(show)

            cmd
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

        cmd.command('publish')
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

        return cmd
    })()


    const file = (() => {
        const cmd = new commander.Command('file')
        
        cmd.description('subcommands for files')

        cmd.command('add')
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

        cmd.command('delete')
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

        return cmd
    })()


    const metadata = (() => {
        const cmd = new commander.Command('metadata')
        
        cmd.description('subcommands for metadata')

        cmd.command('update')
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

        cmd.command('clear')
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
        return cmd
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
