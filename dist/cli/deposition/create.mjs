import * as commander from 'commander';
import { deposition_create_in_new_collection_command } from './create/in-new-collection';
import { deposition_create_in_existing_collection_command } from './create/in-existing-collection';
export const deposition_create_command = () => {
    return new commander.Command()
        .name('create')
        .description('subcommands for creating a deposition')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(deposition_create_in_existing_collection_command())
        .addCommand(deposition_create_in_new_collection_command());
};
