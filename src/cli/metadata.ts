import * as commander from 'commander'
import { metadata_update_command } from './metadata/update'
import { metadata_clear_command } from './metadata/clear'


export const metadata_command = () => {
    return new commander.Command()
        .name('metadata')
        .description('subcommands for metadata')
        .addCommand(metadata_clear_command())
        .addCommand(metadata_update_command())
}
