import * as fs from 'fs'
import * as path from 'path'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'


const load_metadata = (filename: string): object => {
    return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

const load_schema = (): object => {
    const filename = path.join(__dirname, '..', '..', '..', 'assets', 'schema.json')
    return JSON.parse(fs.readFileSync(filename, 'utf8'))
}


export const metadata_validate = (filename: string, verbose = false): void => {
    const msg = `validating metadata from ${filename}...`
    if (verbose) {
        console.log(msg)
    }
    const ajv = new Ajv()
    addFormats(ajv)
    const schema = load_schema()
    const data = load_metadata(filename)
    const validate = ajv.compile(schema)
    const isvalid = validate(data)
    if (isvalid === false) {
        validate.errors.forEach(error => {
            console.log(error)
        })
        throw new Error('(errid 14) Validation error')
    }
    if (verbose) {
        console.log(`${msg}done`)
    }
}
