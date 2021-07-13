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
exports.deposition_show_details_command = void 0;
const details_1 = require("../../../lib/deposition/show/details");
const get_access_token_from_environment_1 = require("../../../lib/helpers/get-access-token-from-environment");
const commander = require("commander");
const deposition_show_details_command = () => {
    return new commander.Command()
        .name('details')
        .arguments('<id>')
        .description('get details pertaining to deposition with id <id>', {
        id: 'deposition id'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent.opts();
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            const details = yield details_1.deposition_show_details(access_token, sandbox, id, 'deposition', verbose);
            console.log(JSON.stringify(details, null, 4));
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
exports.deposition_show_details_command = deposition_show_details_command;
//# sourceMappingURL=details.js.map