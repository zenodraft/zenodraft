import * as commander from 'commander'
import { file_command } from './cli/file'
import { deposition_command } from './cli/deposition'
import { metadata_command } from './cli/metadata'



export const zenodraft_command = () => {
    return new commander.Command()
        .name('zenodraft')
        .version('0.11.0')
        .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
        .enablePositionalOptions()
        .passThroughOptions()
        .option('-s, --sandbox', 'run on zenodo sandbox instead of regular zenodo', false)
        .option('-v, --verbose', 'verbose mode', false)
        .addCommand(deposition_command())
        .addCommand(file_command())
        .addCommand(metadata_command())
        .addHelpText('afterAll', '\n\n' +
        'All commands require a personal access token, which you can get here:' +
        '\n' +
        '\n- Zenodo Sandbox (testing): https://sandbox.zenodo.org/account/settings/applications' +
        '\n- Zenodo (production): https://zenodo.org/account/settings/applications' +
        '\n\nYou only need access tokens for the platforms you plan on using.\n\n')
}
