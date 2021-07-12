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
exports.deposition_show_latest_command = void 0;
const latest_1 = require("../../../lib/deposition/show/latest");
const get_access_token_from_environment_1 = require("../../../lib/helpers/get-access-token-from-environment");
const commander = require("commander");
const deposition_show_latest_command = () => {
    return new commander.Command()
        .name('latest')
        .arguments('<collection_id>')
        .description('get the deposition id of the latest version in the collection with id <collection_id>', {
        collection_id: 'id of the collection whose latest version id we want to retrieve'
    })
        .action((collection_id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent._optionValues;
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            const latest_id = yield latest_1.deposition_show_latest(access_token, sandbox, collection_id, verbose);
            console.log(latest_id);
        }
        catch (e) {
            console.log('');
            console.error(e.message);
        }
    }));
};
exports.deposition_show_latest_command = deposition_show_latest_command;
//# sourceMappingURL=latest.js.map