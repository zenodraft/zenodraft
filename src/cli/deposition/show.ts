import * as commander from 'commander'
import { deposition_show_details_command } from './show/details'
import { deposition_show_draft_command } from './show/draft'
import { deposition_show_files_command } from './show/files'
import { deposition_show_prereserved_command } from './show/prereserved'


export const deposition_show_command = () => {
    return new commander.Command()
        .name('show')
        .description('subcommands for showing information about a deposition')
        .addCommand(deposition_show_details_command())
        .addCommand(deposition_show_draft_command())
        .addCommand(deposition_show_files_command())
        .addCommand(deposition_show_prereserved_command())
}
