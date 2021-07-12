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
exports.deposition_delete_command = void 0;
const commander = require("commander");
const get_access_token_from_environment_1 = require("../../lib/helpers/get-access-token-from-environment");
const delete_1 = require("../../lib/deposition/delete");
const deposition_delete_command = () => {
    return new commander.Command()
        .name('delete')
        .arguments('<id>')
        .description('delete draft deposition with id <id>', {
        id: 'deposition id'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent._optionValues;
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            yield delete_1.deposition_delete(access_token, sandbox, id, verbose);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
exports.deposition_delete_command = deposition_delete_command;
//# sourceMappingURL=delete.js.map