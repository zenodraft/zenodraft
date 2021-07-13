"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zenodraft_command = void 0;
const commander = require("commander");
const file_1 = require("./cli/file");
const deposition_1 = require("./cli/deposition");
const metadata_1 = require("./cli/metadata");
const zenodraft_command = () => {
    return new commander.Command()
        .name('zenodraft')
        .version('0.11.0')
        .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
        .enablePositionalOptions()
        .passThroughOptions()
        .option('-s, --sandbox', 'run on zenodo sandbox instead of regular zenodo', false)
        .option('-v, --verbose', 'verbose mode', false)
        .addCommand(deposition_1.deposition_command())
        .addCommand(file_1.file_command())
        .addCommand(metadata_1.metadata_command())
        .addHelpText('afterAll', '\n\n' +
        'All commands require a personal access token, which you can get here:' +
        '\n' +
        '\n- Zenodo Sandbox (testing): https://sandbox.zenodo.org/account/settings/applications' +
        '\n- Zenodo (production): https://zenodo.org/account/settings/applications' +
        '\n\nYou only need access tokens for the platforms you plan on using.\n\n');
};
exports.zenodraft_command = zenodraft_command;
//# sourceMappingURL=cli.js.map