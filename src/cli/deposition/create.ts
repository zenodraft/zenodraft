import * as commander from 'commander'
import { deposition_create_concept_command } from './create/concept'
import { deposition_create_version_command } from './create/version'



export const deposition_create_command = () => {
    return new commander.Command()
        .name('create')
        .description('subcommands for creating a deposition')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(deposition_create_concept_command())
        .addCommand(deposition_create_version_command())
}
