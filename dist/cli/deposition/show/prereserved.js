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
exports.deposition_show_prereserved_command = void 0;
const prereserved_1 = require("../../../lib/deposition/show/prereserved");
const get_access_token_from_environment_1 = require("../../../lib/helpers/get-access-token-from-environment");
const commander = require("commander");
const deposition_show_prereserved_command = () => {
    return new commander.Command()
        .name('prereserved')
        .arguments('<id>')
        .description('get the prereserved doi of the draft deposition with id <id>', {
        id: 'id of the deposition whose prereserved doi we want to retrieve'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent.opts();
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            const prereserved = yield prereserved_1.deposition_show_prereserved(access_token, sandbox, id, verbose);
            console.log(prereserved);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
exports.deposition_show_prereserved_command = deposition_show_prereserved_command;
//# sourceMappingURL=prereserved.js.map