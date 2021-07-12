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
exports.metadata_clear_command = void 0;
const get_access_token_from_environment_1 = require("../../lib/helpers/get-access-token-from-environment");
const update_1 = require("../../lib/metadata/update");
const commander = require("commander");
const metadata_clear_command = () => {
    return new commander.Command()
        .name('clear')
        .arguments('<id>')
        .description('clear the metadata of an existing deposition with id <id>', {
        id: 'deposition id'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent._optionValues;
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            yield update_1.metadata_update(access_token, sandbox, id, undefined, verbose);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
exports.metadata_clear_command = metadata_clear_command;
//# sourceMappingURL=clear.js.map