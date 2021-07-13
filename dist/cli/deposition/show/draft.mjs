var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_show_draft } from '../../../lib/deposition/show/draft';
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment';
import * as commander from 'commander';
export const deposition_show_draft_command = () => {
    return new commander.Command()
        .name('draft')
        .arguments('<collection_id>')
        .description('get the draft deposition id of the collection with id <collection_id>', {
        collection_id: 'id of the collection for which we want to retrieve the draft id'
    })
        .action((collection_id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent.opts();
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            const draft_id = yield deposition_show_draft(access_token, sandbox, collection_id, verbose);
            console.log(draft_id);
        }
        catch (e) {
            console.log('');
            console.error(e.message);
        }
    }));
};
