var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as commander from 'commander';
import { file_add } from './file/add';
import { deposition_create_in_existing_collection } from './deposition/create/in-existing-collection';
import { deposition_create_in_new_collection } from './deposition/create/in-new-collection';
import { file_delete } from './file/delete';
import { deposition_delete } from './deposition/delete';
import { deposition_show_details } from './deposition/show/details';
import { deposition_publish } from './deposition/publish';
import { metadata_update } from './metadata/update';
import { deposition_show_latest } from './deposition/show/latest';
import { deposition_show_prereserved } from './deposition/show/prereserved';
export const cli = () => {
    const create = (() => {
        const create = new commander.Command('create');
        create.description('subcommands for creating a deposition');
        create
            .command('in-new-collection')
            .description('create a new draft deposition in a new collection')
            .action(() => {
            deposition_create_in_new_collection(zenodraft.opts().sandbox, zenodraft.opts().verbose);
        });
        create
            .command('in-existing-collection')
            .arguments('<collection_id>')
            .description('create a new draft deposition as a new version in an existing collection', {
            collection_id: 'id for the collection that the new deposition will be part of.'
        })
            .action((collection_id) => {
            deposition_create_in_existing_collection(zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose);
        });
        return create;
    })();
    const show = (() => {
        const show = new commander.Command('show');
        show.description('subcommands for showing information about a deposition');
        show
            .command('details')
            .arguments('<id>')
            .description('get details pertaining to deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => __awaiter(void 0, void 0, void 0, function* () {
            const details = yield deposition_show_details(zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
            console.log(JSON.stringify(details, null, 4));
        }));
        show
            .command('latest')
            .arguments('<collection_id>')
            .description('get the latest draft deposition id of the collection with id <collection_id>', {
            collection_id: 'id of the collection whose latest draft we want to retrieve'
        })
            .action((collection_id) => __awaiter(void 0, void 0, void 0, function* () {
            const latest_draft_id = yield deposition_show_latest(zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose);
            if (latest_draft_id === '') {
                if (zenodraft.opts().verbose) {
                    console.log(`There are no drafts in collection ${collection_id}.`);
                }
            }
            else {
                console.log(latest_draft_id);
            }
        }));
        show
            .command('prereserved')
            .arguments('<latest_id>')
            .description('get the prereserved doi of the draft deposition with id <latest_id>', {
            latest_id: 'id of the deposition whose prereserved doi we want to retrieve'
        })
            .action((latest_id) => __awaiter(void 0, void 0, void 0, function* () {
            const prereserved = yield deposition_show_prereserved(zenodraft.opts().sandbox, latest_id, zenodraft.opts().verbose);
            console.log(prereserved);
        }));
        return show;
    })();
    const deposition = (() => {
        const deposition = new commander.Command('deposition');
        deposition.description('subcommands for depositions');
        deposition
            .addCommand(create)
            .addCommand(show);
        deposition
            .command('delete')
            .arguments('<id>')
            .description('delete draft deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => {
            deposition_delete(zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
        });
        deposition
            .command('publish')
            .arguments('<id>')
            .description('publish draft deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => {
            deposition_publish(zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
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
            file_add(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
        });
        file
            .command('delete')
            .arguments('<id> <filename>')
            .description('delete a file with filename <filename> from draft deposition with id <id>', {
            id: 'deposition id',
            filename: 'filename of the deposition file that is going to be deleted.'
        })
            .action((id, filename) => {
            file_delete(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
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
            metadata_update(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
        });
        metadata
            .command('clear')
            .arguments('<id>')
            .description('clear the metadata of an existing deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => {
            metadata_update(zenodraft.opts().sandbox, id, undefined, zenodraft.opts().verbose);
        });
        return metadata;
    })();
    const zenodraft = new commander.Command('zenodraft')
        .version('0.10.0')
        .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
        .option('-s, --sandbox', 'run on zenodo sandbox instead of regular zenodo', false)
        .option('-v, --verbose', 'verbose mode', false);
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
        .parse(process.argv);
    return zenodraft;
};
