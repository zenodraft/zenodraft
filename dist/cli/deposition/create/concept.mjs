var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_create_concept } from '../../../lib/deposition/create/concept';
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment';
import * as commander from 'commander';
export const deposition_create_concept_command = () => {
    return new commander.Command()
        .name('concept')
        .description('create a new draft deposition in a new concept')
        .action((opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent.opts();
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            const id = yield deposition_create_concept(access_token, sandbox, verbose);
            console.log(id);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
