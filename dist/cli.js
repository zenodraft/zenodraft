"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const in_existing_collection_1 = require("./deposition/create/in-existing-collection");
const in_new_collection_1 = require("./deposition/create/in-new-collection");
const delete_1 = require("./deposition/delete");
const publish_1 = require("./deposition/publish");
const details_1 = require("./deposition/show/details");
const draft_1 = require("./deposition/show/draft");
const files_1 = require("./deposition/show/files");
const latest_1 = require("./deposition/show/latest");
const prereserved_1 = require("./deposition/show/prereserved");
const add_1 = require("./file/add");
const delete_2 = require("./file/delete");
const get_access_token_from_environment_1 = require("./helpers/get-access-token-from-environment");
const update_1 = require("./metadata/update");
const commander = require("commander");
const os = require("os");
const cli = () => {
    const create = (() => {
        const cmd = new commander.Command('create');
        cmd.description('subcommands for creating a deposition');
        cmd.command('in-new-collection')
            .description('create a new draft deposition in a new collection')
            .action(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                const id = yield in_new_collection_1.deposition_create_in_new_collection(access_token, zenodraft.opts().sandbox, zenodraft.opts().verbose);
                console.log(id);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        cmd.command('in-existing-collection')
            .arguments('<collection_id>')
            .description('create a new draft deposition as a new version in an existing collection', {
            collection_id: 'id for the collection that the new deposition will be part of.'
        })
            .action((collection_id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                const id = yield in_existing_collection_1.deposition_create_in_existing_collection(access_token, zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose);
                console.log(id);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        return cmd;
    })();
    const show = (() => {
        const cmd = new commander.Command('show');
        cmd.description('subcommands for showing information about a deposition');
        cmd.command('details')
            .arguments('<id>')
            .description('get details pertaining to deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                const details = yield details_1.deposition_show_details(access_token, zenodraft.opts().sandbox, id, 'deposition', zenodraft.opts().verbose);
                console.log(JSON.stringify(details, null, 4));
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        cmd.command('draft')
            .arguments('<collection_id>')
            .description('get the draft deposition id of the collection with id <collection_id>', {
            collection_id: 'id of the collection for which we want to retrieve the draft id'
        })
            .action((collection_id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                const draft_id = yield draft_1.deposition_show_draft(access_token, zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose);
                console.log(draft_id);
            }
            catch (e) {
                console.log('');
                console.error(e.message);
            }
        }));
        cmd.command('files')
            .arguments('<collection_id>')
            .description('get the filenames for the files in deposition with id <id>', {
            id: 'id of the deposition for which we want to retrieve the list of filenames'
        })
            .action((id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                const filenames = yield files_1.deposition_show_files(access_token, zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
                console.log(filenames.join(os.EOL));
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        cmd.command('latest')
            .arguments('<collection_id>')
            .description('get the deposition id of the latest version in the collection with id <collection_id>', {
            collection_id: 'id of the collection whose latest version id we want to retrieve'
        })
            .action((collection_id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                const latest_id = yield latest_1.deposition_show_latest(access_token, zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose);
                console.log(latest_id);
            }
            catch (e) {
                console.log('');
                console.error(e.message);
            }
        }));
        cmd.command('prereserved')
            .arguments('<latest_id>')
            .description('get the prereserved doi of the draft deposition with id <latest_id>', {
            latest_id: 'id of the deposition whose prereserved doi we want to retrieve'
        })
            .action((latest_id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                const prereserved = yield prereserved_1.deposition_show_prereserved(access_token, zenodraft.opts().sandbox, latest_id, zenodraft.opts().verbose);
                console.log(prereserved);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        return cmd;
    })();
    const deposition = (() => {
        const cmd = new commander.Command('deposition');
        cmd.description('subcommands for depositions');
        cmd.addCommand(create)
            .addCommand(show);
        cmd
            .command('delete')
            .arguments('<id>')
            .description('delete draft deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                yield delete_1.deposition_delete(access_token, zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        cmd.command('publish')
            .arguments('<id>')
            .description('publish draft deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                yield publish_1.deposition_publish(access_token, zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        return cmd;
    })();
    const file = (() => {
        const cmd = new commander.Command('file');
        cmd.description('subcommands for files');
        cmd.command('add')
            .arguments('<id> <filename>')
            .description('add a local file with filename <filename> to existing deposition with id <id>', {
            id: 'deposition id',
            filename: 'filename of the local file that is going to be added'
        })
            .action((id, filename) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                yield add_1.file_add(access_token, zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        cmd.command('delete')
            .arguments('<id> <filename>')
            .description('delete a file with filename <filename> from draft deposition with id <id>', {
            id: 'deposition id',
            filename: 'filename of the deposition file that is going to be deleted.'
        })
            .action((id, filename) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                yield delete_2.file_delete(access_token, zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        return cmd;
    })();
    const metadata = (() => {
        const cmd = new commander.Command('metadata');
        cmd.description('subcommands for metadata');
        cmd.command('update')
            .arguments('<id> <filename>')
            .description('update the metadata of an existing deposition with id <id> using the metadata from <filename>', {
            id: 'deposition id',
            filename: 'filename of file holding the metadata in Zenodo metadata format'
        })
            .action((id, filename) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                yield update_1.metadata_update(access_token, zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        cmd.command('clear')
            .arguments('<id>')
            .description('clear the metadata of an existing deposition with id <id>', {
            id: 'deposition id'
        })
            .action((id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(zenodraft.opts().sandbox);
                yield update_1.metadata_update(access_token, zenodraft.opts().sandbox, id, undefined, zenodraft.opts().verbose);
            }
            catch (e) {
                console.error(e.message);
            }
        }));
        return cmd;
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
exports.cli = cli;
//# sourceMappingURL=cli.js.map