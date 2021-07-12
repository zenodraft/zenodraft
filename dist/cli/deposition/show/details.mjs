var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_show_details } from '../../../lib/deposition/show/details';
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment';
import * as commander from 'commander';
export const deposition_show_details_command = () => {
    return new commander.Command()
        .name('details')
        .arguments('<id>')
        .description('get details pertaining to deposition with id <id>', {
        id: 'deposition id'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent._optionValues;
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            const details = yield deposition_show_details(access_token, sandbox, id, 'deposition', verbose);
            console.log(JSON.stringify(details, null, 4));
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
//# sourceMappingURL=details.js.map