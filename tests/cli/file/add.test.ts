import { describe, test } from '@jest/globals'
import { zenodraft_command } from '../../../src/cli'
import { define_token } from '../../test-helpers'



describe('cli', () => {

    test('zenodraft --sandbox file add 101 thefile.txt', () => {
        define_token(true, 'faux_zenodo_sandbox_token')
        const program = zenodraft_command().exitOverride()
        const throwfun = () => {
            program.parse(['--sandbox', 'file', 'add', '101', 'thefile.txt'], {from: 'user'})
        }
        console.warn('It looks like maybe something async is not going right, because I see the error after the test finishes')
        expect(throwfun).toThrow()
        try {
            throwfun()
        } catch (err) {
            expect(err.message).toBe('Response was 404 - NOT FOUND')
        }
    })

})
