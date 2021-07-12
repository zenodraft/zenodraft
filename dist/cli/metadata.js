"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata_command = void 0;
const commander = require("commander");
const update_1 = require("./metadata/update");
const clear_1 = require("./metadata/clear");
const metadata_command = () => {
    return new commander.Command()
        .name('metadata')
        .description('subcommands for metadata')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(clear_1.metadata_clear_command())
        .addCommand(update_1.metadata_update_command());
};
exports.metadata_command = metadata_command;
//# sourceMappingURL=metadata.js.map