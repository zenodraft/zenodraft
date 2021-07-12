var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deposition_create_in_existing_collection } from '../../../lib/deposition/create/in-existing-collection';
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment';
import * as commander from 'commander';
export const deposition_create_in_existing_collection_command = () => {
    return new commander.Command()
        .name('in-existing-collection')
        .arguments('<collection_id>')
        .description('create a new draft deposition as a new version in an existing collection', {
        collection_id: 'id for the collection that the new deposition will be part of.'
    })
        .action((collection_id, opts, self) => __awaiter(void 0, void 0, void 0, function* () {
        const { sandbox, verbose } = self.parent.parent.parent._optionValues;
        try {
            const access_token = helpers_get_access_token_from_environment(sandbox);
            const id = yield deposition_create_in_existing_collection(access_token, sandbox, collection_id, verbose);
            console.log(id);
        }
        catch (e) {
            console.error(e.message);
        }
    }));
};
//# sourceMappingURL=in-existing-collection.js.map