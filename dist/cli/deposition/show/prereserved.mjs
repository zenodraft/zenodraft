var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_show_prereserved } from '../../../lib/deposition/show/prereserved';
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment';
import * as commander from 'commander';
export const deposition_show_prereserved_command = () => {
    return new commander.Command()
        .name('prereserved')
        .arguments('<id>')
        .description('get the prereserved doi of the draft deposition with id <id>', {
        id: 'id of the deposition whose prereserved doi we want to retrieve'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent._optionValues;
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            const prereserved = yield deposition_show_prereserved(access_token, sandbox, id, verbose);
            console.log(prereserved);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
//# sourceMappingURL=prereserved.js.map