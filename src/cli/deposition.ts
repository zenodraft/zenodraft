import * as commander from 'commander'
import { deposition_create_command } from './deposition/create'
import { deposition_show_command } from './deposition/show'
import { deposition_delete_command } from './deposition/delete'
import { deposition_publish_command } from './deposition/publish'


export const deposition_command = () => {
    return new commander.Command()
        .name('deposition')
        .description('Subcommands for depositions.')
        .addCommand(deposition_create_command())
        .addCommand(deposition_show_command())
        .addCommand(deposition_delete_command())
        .addCommand(deposition_publish_command())
}
