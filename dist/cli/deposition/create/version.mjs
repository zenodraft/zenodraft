var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_create_version } from '../../../lib/deposition/create/version';
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment';
import * as commander from 'commander';
export const deposition_create_version_command = () => {
    return new commander.Command()
        .name('version')
        .arguments('<concept_id>')
        .description('create a new draft deposition as a new version in an existing concept', {
        concept_id: 'id for the concept that the new deposition will be part of.'
    })
        .action((concept_id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent.opts();
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            const id = yield deposition_create_version(access_token, sandbox, concept_id, verbose);
            console.log(id);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
