"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposition_show_command = void 0;
const commander = require("commander");
const details_1 = require("./show/details");
const draft_1 = require("./show/draft");
const files_1 = require("./show/files");
const latest_1 = require("./show/latest");
const prereserved_1 = require("./show/prereserved");
const deposition_show_command = () => {
    return new commander.Command()
        .name('show')
        .description('subcommands for showing information about a deposition')
        .enablePositionalOptions()
        .passThroughOptions()
        .addCommand(details_1.deposition_show_details_command())
        .addCommand(draft_1.deposition_show_draft_command())
        .addCommand(files_1.deposition_show_files_command())
        .addCommand(latest_1.deposition_show_latest_command())
        .addCommand(prereserved_1.deposition_show_prereserved_command());
};
exports.deposition_show_command = deposition_show_command;
//# sourceMappingURL=show.js.map