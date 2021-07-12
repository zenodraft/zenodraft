import * as commander from 'commander'
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { deposition_publish } from '../../lib/deposition/publish'



export const deposition_publish_command = () => {
    return new commander.Command()
        .name('publish')
        .arguments('<id>')
        .description('publish draft deposition with id <id>', {
            id: 'deposition id'
        })
        .action(async (id, opts, self) => {
            const {sandbox, verbose} = self.parent.parent._optionValues
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await deposition_publish(access_token, sandbox, id, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
}
