import { describe, test } from '@jest/globals'
import { zenodraft_command } from '../src/cli'



describe('cli', () => {

    test('zenodraft --version', () => {
        const program = zenodraft_command().exitOverride()
        const throwfun = () => {
            program.parse(['--version'], {from: 'user'})
        }
        expect(throwfun).toThrow()
        try {
            throwfun()
        } catch (err) {
            expect(err.code).toBe('commander.version')
            expect(err.exitCode).toBe(0)
            expect(err.message).toBe('0.11.0')
        }
    })

})
