var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { file_delete } from '../../lib/file/delete';
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment';
import * as commander from 'commander';
export const file_delete_command = () => {
    return new commander.Command()
        .name('delete')
        .arguments('<id> <remote_filename>')
        .description('delete a file with filename <remote_filename> from draft deposition with id <id>', {
        id: 'deposition id',
        remote_filename: 'filename of the deposition file that is going to be deleted.'
    })
        .action((id, remote_filename, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent._optionValues;
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            yield file_delete(access_token, sandbox, id, remote_filename, verbose);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
//# sourceMappingURL=delete.js.map