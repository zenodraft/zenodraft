"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_command = void 0;
const commander = require("commander");
const add_1 = require("./file/add");
const delete_1 = require("./file/delete");
const file_command = () => {
    return new commander.Command()
        .name('file')
        .description('subcommands for files')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(add_1.file_add_command())
        .addCommand(delete_1.file_delete_command());
};
exports.file_command = file_command;
//# sourceMappingURL=file.js.map