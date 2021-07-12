var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { file_add } from '../../lib/file/add';
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment';
import * as commander from 'commander';
export const file_add_command = () => {
    return new commander.Command()
        .name('add')
        .arguments('<id> <local_filename>')
        .description('add a local file with filename <local_filename> to existing draft deposition with id <id>', {
        id: 'deposition id',
        local_filename: 'filename of the local file that is going to be added'
    })
        .action((id, local_filename, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent._optionValues;
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            yield file_add(access_token, sandbox, id, local_filename, verbose);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
//# sourceMappingURL=add.js.map