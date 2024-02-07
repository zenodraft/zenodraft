import * as commander from 'commander'
import { metadata_clear_command } from './metadata/clear'
import { metadata_update_command } from './metadata/update'
import { metadata_validate_command } from './metadata/validate'



export const metadata_command = () => {
    return new commander.Command()
        .name('metadata')
        .description('Subcommands for metadata.')
        .addCommand(metadata_clear_command())
        .addCommand(metadata_update_command())
        .addCommand(metadata_validate_command())
}
