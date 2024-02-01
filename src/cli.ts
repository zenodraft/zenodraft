import * as commander from 'commander'
import { deposition_command } from './cli/deposition'
import { file_command } from './cli/file'
import { metadata_command } from './cli/metadata'
import { tokensHelpText } from './lib/helpers/tokens-help-text'


export const zenodraft_command = () => {
    return new commander.Command()
        .name('zenodraft')
        .version('0.13.3')
        .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
        .addCommand(deposition_command())
        .addCommand(file_command())
        .addCommand(metadata_command())
        .addHelpText('after', tokensHelpText)
        .addHelpText('afterAll', '\nIf you use this tool, consider starring it on GitHub:\nhttps://github.com/zenodraft/zenodraft')
}
