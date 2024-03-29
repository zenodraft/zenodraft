import * as commander from 'commander'
import { file_add_command } from './file/add'
import { file_delete_command } from './file/delete'


export const file_command = () => {
    return new commander.Command()
        .name('file')
        .description('Subcommands for files.')
        .addCommand(file_add_command())
        .addCommand(file_delete_command())
}
