"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposition_create_command = void 0;
const commander = require("commander");
const concept_1 = require("./create/concept");
const version_1 = require("./create/version");
const deposition_create_command = () => {
    return new commander.Command()
        .name('create')
        .description('subcommands for creating a deposition')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(concept_1.deposition_create_concept_command())
        .addCommand(version_1.deposition_create_version_command());
};
exports.deposition_create_command = deposition_create_command;
//# sourceMappingURL=create.js.map