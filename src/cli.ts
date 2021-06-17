import * as commander from 'commander'
import { add_file_to_deposition } from './file/add'
import { create_empty_deposition_in_existing_collection } from './deposition/create/in-existing-collection'
import { create_empty_deposition_in_new_collection } from './deposition/create/in-new-collection'
import { delete_deposition_file } from './file/delete'
import { delete_draft_deposition } from './deposition/delete'
import { get_deposition_details } from './deposition/show/details'
import { publish_draft_deposition } from './deposition/publish'
import { update_deposition_metadata } from './metadata/update'
import { get_latest_draft } from './deposition/show/latest'
import { get_prereserved } from './deposition/show/prereserved'


export const cli = () => {

    const create = (() => {
        const create = new commander.Command('create')
        create.description('subcommands for creating a deposition')

        create
            .command('in-new-collection')
            .description('create a new draft deposition in a new collection')
            .action(() => {
                create_empty_deposition_in_new_collection(zenodraft.opts().sandbox, zenodraft.opts().verbose)
            })

        create
            .command('in-existing-collection')
            .arguments('<collection_id>')
            .description('create a new draft deposition as a new version in an existing collection', {
                collection_id: 'id for the collection that the new deposition will be part of.'
            })
            .action((collection_id: string) => {
                create_empty_deposition_in_existing_collection(zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose)
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
                const details = await get_deposition_details(zenodraft.opts().sandbox, id, zenodraft.opts().verbose)
                console.log(JSON.stringify(details, null, 4))
            })

        show
            .command('latest')
            .arguments('<collection_id>')
            .description('get the latest draft deposition id of the collection with id <collection_id>', {
                collection_id: 'id of the collection whose latest draft we want to retrieve'
            })
            .action(async (collection_id: string) => {
                const latest_draft_id = await get_latest_draft(zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose)
                if (latest_draft_id === '') {
                    if (zenodraft.opts().verbose) {
                        console.log(`There are no drafts in collection ${collection_id}.`)
                    }
                } else {
                    console.log(latest_draft_id)
                }
            })

        show
            .command('prereserved')
            .arguments('<latest_id>')
            .description('get the prereserved doi of the draft deposition with id <latest_id>', {
                latest_id: 'id of the deposition whose prereserved doi we want to retrieve'
            })
            .action(async (latest_id: string) => {
                const prereserved = await get_prereserved(zenodraft.opts().sandbox, latest_id, zenodraft.opts().verbose)
                console.log(prereserved)
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
            .action((id: string) => {
                delete_draft_deposition(zenodraft.opts().sandbox, id, zenodraft.opts().verbose)
            })

        deposition
            .command('publish')
            .arguments('<id>')
            .description('publish draft deposition with id <id>', {
                id: 'deposition id'
            })
            .action((id: string) => {
                publish_draft_deposition(zenodraft.opts().sandbox, id, zenodraft.opts().verbose)
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
            .action((id: string, filename: string) => {
                add_file_to_deposition(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose)
            })

        file
            .command('delete')
            .arguments('<id> <filename>')
            .description('delete a file with filename <filename> from draft deposition with id <id>', {
                id: 'deposition id',
                filename: 'filename of the deposition file that is going to be deleted.'
            })
            .action((id: string, filename: string) => {
                delete_deposition_file(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose)
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
            .action((id: string, filename: string) => {
                update_deposition_metadata(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose)
            })
        metadata
            .command('clear')
            .arguments('<id>')
            .description('clear the metadata of an existing deposition with id <id>', {
                id: 'deposition id'
            })
            .action((id: string) => {
                update_deposition_metadata(zenodraft.opts().sandbox, id, undefined, zenodraft.opts().verbose)
            })
        return metadata
    })()


    const zenodraft = new commander.Command('zenodraft')
        .version('0.6.0')
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
