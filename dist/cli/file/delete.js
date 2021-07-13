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
exports.file_delete_command = void 0;
const delete_1 = require("../../lib/file/delete");
const get_access_token_from_environment_1 = require("../../lib/helpers/get-access-token-from-environment");
const commander = require("commander");
const file_delete_command = () => {
    return new commander.Command()
        .name('delete')
        .arguments('<id> <remote_filename>')
        .description('delete a file with filename <remote_filename> from draft deposition with id <id>', {
        id: 'deposition id',
        remote_filename: 'filename of the deposition file that is going to be deleted.'
    })
        .action((id, remote_filename, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.opts();
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            yield delete_1.file_delete(access_token, sandbox, id, remote_filename, verbose);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
exports.file_delete_command = file_delete_command;
//# sourceMappingURL=delete.js.map