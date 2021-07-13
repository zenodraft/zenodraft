var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment';
import { metadata_update } from '../../lib/metadata/update';
import * as commander from 'commander';
export const metadata_clear_command = () => {
    return new commander.Command()
        .name('clear')
        .arguments('<id>')
        .description('clear the metadata of an existing deposition with id <id>', {
        id: 'deposition id'
    })
        .action((id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.opts();
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            yield metadata_update(access_token, sandbox, id, undefined, verbose);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
