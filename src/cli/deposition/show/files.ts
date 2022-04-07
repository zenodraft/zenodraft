import { deposition_show_files } from '../../../lib/deposition/show/files'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'
import * as os from 'os'



export const deposition_show_files_command = () => {
    return new commander.Command()
        .name('files')
        .arguments('<concept_id>')
        .description('get the filenames for the files in deposition with id <id>', {
            id: 'id of the deposition for which we want to retrieve the list of filenames'
        })
        .action(async (id, opts, self) => {
            const {sandbox, verbose} = self.parent.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const filenames = await deposition_show_files(access_token, sandbox, id, verbose)
                console.log(filenames.join(os.EOL))
            } catch (e) {
                console.error(e.message)
            }

        })
}
