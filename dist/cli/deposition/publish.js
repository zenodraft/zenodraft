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
exports.deposition_publish_command = void 0;
const commander = require("commander");
const get_access_token_from_environment_1 = require("../../lib/helpers/get-access-token-from-environment");
const publish_1 = require("../../lib/deposition/publish");
const deposition_publish_command = () => {
    return new commander.Command()
        .name('publish')
        .arguments('<id>')
        .description('publish draft deposition with id <id>', {
        id: 'deposition id'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.opts();
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            yield publish_1.deposition_publish(access_token, sandbox, id, verbose);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
exports.deposition_publish_command = deposition_publish_command;
//# sourceMappingURL=publish.js.map