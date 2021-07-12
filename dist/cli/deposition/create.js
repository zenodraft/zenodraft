"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposition_create_command = void 0;
const commander = require("commander");
const in_new_collection_1 = require("./create/in-new-collection");
const in_existing_collection_1 = require("./create/in-existing-collection");
const deposition_create_command = () => {
    return new commander.Command()
        .name('create')
        .description('subcommands for creating a deposition')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(in_existing_collection_1.deposition_create_in_existing_collection_command())
        .addCommand(in_new_collection_1.deposition_create_in_new_collection_command());
};
exports.deposition_create_command = deposition_create_command;
//# sourceMappingURL=create.js.map