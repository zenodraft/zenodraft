"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposition_show_files_command = void 0;
const files_1 = require("../../../lib/deposition/show/files");
const get_access_token_from_environment_1 = require("../../../lib/helpers/get-access-token-from-environment");
const commander = require("commander");
const os = require("os");
const deposition_show_files_command = () => {
    return new commander.Command()
        .name('files')
        .arguments('<collection_id>')
        .description('get the filenames for the files in deposition with id <id>', {
        id: 'id of the deposition for which we want to retrieve the list of filenames'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent._optionValues;
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            const filenames = yield files_1.deposition_show_files(access_token, sandbox, id, verbose);
            console.log(filenames.join(os.EOL));
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
exports.deposition_show_files_command = deposition_show_files_command;
//# sourceMappingURL=files.js.map