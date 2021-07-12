"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposition_command = void 0;
const commander = require("commander");
const create_1 = require("./deposition/create");
const show_1 = require("./deposition/show");
const delete_1 = require("./deposition/delete");
const publish_1 = require("./deposition/publish");
const deposition_command = () => {
    return new commander.Command()
        .name('deposition')
        .description('subcommands for creating a deposition')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(create_1.deposition_create_command())
        .addCommand(show_1.deposition_show_command())
        .addCommand(delete_1.deposition_delete_command())
        .addCommand(publish_1.deposition_publish_command());
};
exports.deposition_command = deposition_command;
//# sourceMappingURL=deposition.js.map