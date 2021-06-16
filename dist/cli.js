#!/usr/bin/env node
import * as commander from 'commander';
import { add_file_to_deposition } from './add-file-to-deposition.js';
import { create_empty_deposition_in_existing_collection } from './create-empty-deposition-in-existing-collection.js';
import { create_empty_deposition_in_new_collection } from './create-empty-deposition-in-new-collection.js';
import { delete_deposition_file } from './delete-deposition-file.js';
import { delete_draft_deposition } from './delete-draft-deposition.js';
import { get_deposition_details } from './get-deposition-details.js';
import { publish_draft_deposition } from './publish-draft-deposition.js';
import { update_deposition_metadata } from './update-deposition-metadata.js';
import { get_latest_draft } from './get-latest-draft.js';
export const cli = () => {
    const create = (() => {
        const create = new commander.Command('create');
        create.description('subcommands for creating a deposition');
        create
            .command('in-new-collection')
            .description('create a new draft deposition in a new collection')
            .action(() => {
            create_empty_deposition_in_new_collection(zenodraft.opts().sandbox, zenodraft.opts().verbose);
        });
        create
            .command('in-existing-collection')
            .arguments('<collection_id>')
            .description('create a new draft deposition as a new version in an existing collection', {
            collection_id: 'id for the collection that the new deposition will be part of.'
        })
            .action((collection_id) => {
            create_empty_deposition_in_existing_collection(zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose);
        });
        return create;
    })();
    const deposition = (() => {
        const deposition = new commander.Command('deposition');
        deposition.description('subcommands for depositions');
        deposition
            .addCommand(create);
        deposition
            .command('delete')
            .arguments('<id>')
            .description('delete draft deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => {
            delete_draft_deposition(zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
        });
        deposition
            .command('details')
            .arguments('<id>')
            .description('get details pertaining to deposition with id <id>', {
            id: 'deposition id'
        })
            .action(async (id) => {
            const details = await get_deposition_details(zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
            console.log(JSON.stringify(details, null, 4));
        });
        deposition
            .command('latest')
            .arguments('<collection_id>')
            .description('get the latest draft deposition id of the collection with id <collection_id>', {
            collection_id: 'id of the collection whose latest draft we want to retrieve'
        })
            .action(async (collection_id) => {
            const latest_draft_id = await get_latest_draft(zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose);
            console.log(latest_draft_id);
        });
        deposition
            .command('publish')
            .arguments('<id>')
            .description('publish draft deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => {
            publish_draft_deposition(zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
        });
        return deposition;
    })();
    const file = (() => {
        const file = new commander.Command('file');
        file.description('subcommands for files');
        file
            .command('add')
            .arguments('<id> <filename>')
            .description('add a local file with filename <filename> to existing deposition with id <id>', {
            id: 'deposition id',
            filename: 'filename of the local file that is going to be added'
        })
            .action((id, filename) => {
            add_file_to_deposition(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
        });
        file
            .command('delete')
            .arguments('<id> <filename>')
            .description('delete a file with filename <filename> from draft deposition with id <id>', {
            id: 'deposition id',
            filename: 'filename of the deposition file that is going to be deleted.'
        })
            .action((id, filename) => {
            delete_deposition_file(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
        });
        return file;
    })();
    const metadata = (() => {
        const metadata = new commander.Command('metadata');
        metadata.description('subcommands for metadata');
        metadata
            .command('update')
            .arguments('<id> <filename>')
            .description('update the metadata of an existing deposition with id <id> using the metadata from <filename>', {
            id: 'deposition id',
            filename: 'filename of file holding the metadata in Zenodo metadata format'
        })
            .action((id, filename) => {
            update_deposition_metadata(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
        });
        metadata
            .command('clear')
            .arguments('<id>')
            .description('clear the metadata of an existing deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => {
            update_deposition_metadata(zenodraft.opts().sandbox, id, undefined, zenodraft.opts().verbose);
        });
        return metadata;
    })();
    const zenodraft = new commander.Command('zenodraft')
        .version('0.3.0')
        .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
        .option('-s, --sandbox', 'run on zenodo sandbox instead of regular zenodo', false)
        .option('-v, --verbose', 'verbose mode', false)
        .addCommand(deposition)
        .addCommand(file)
        .addCommand(metadata)
        .parse(process.argv);
    return zenodraft;
};
