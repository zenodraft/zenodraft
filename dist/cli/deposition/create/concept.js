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
exports.deposition_create_concept_command = void 0;
const concept_1 = require("../../../lib/deposition/create/concept");
const get_access_token_from_environment_1 = require("../../../lib/helpers/get-access-token-from-environment");
const commander = require("commander");
const deposition_create_concept_command = () => {
    return new commander.Command()
        .name('concept')
        .description('create a new draft deposition in a new concept')
        .action((opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent.opts();
        try {
            const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
            const id = yield concept_1.deposition_create_concept(access_token, sandbox, verbose);
            console.log(id);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
exports.deposition_create_concept_command = deposition_create_concept_command;
//# sourceMappingURL=concept.js.map