import * as commander from 'commander'
import { deposition_command } from './cli/deposition'
import { file_command } from './cli/file'
import { metadata_command } from './cli/metadata'


export const zenodraft_command = () => {
    return new commander.Command()
        .name('zenodraft')
        .version('0.12.0')
        .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(deposition_command())
        .addCommand(file_command())
        .addCommand(metadata_command())
        .addHelpText('afterAll', '\n' +
        'All commands require a personal access token, which you can get here:\n' +
        '- Zenodo Sandbox (testing): https://sandbox.zenodo.org/account/settings/applications\n' +
        '- Zenodo (production)     : https://zenodo.org/account/settings/applications\n' +
        'You only need access tokens for the platforms you plan on using.\n' +
        '\n' +
        'If you like this tool, consider starring it on GitHub: \n' +
        'https://github.com/zenodraft/zenodraft\n')
}
