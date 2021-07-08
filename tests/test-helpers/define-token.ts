export const define_token = (sandbox: boolean, token: string) => {

    if (sandbox === true) {
        if (process.env.ZENODO_SANDBOX_ACCESS_TOKEN === undefined) {
            process.env.ZENODO_SANDBOX_ACCESS_TOKEN = token
        }
    } else if (sandbox === false) {
        if (process.env.ZENODO_ACCESS_TOKEN === undefined) {
            process.env.ZENODO_ACCESS_TOKEN = token
        }
    } else {
        throw new Error('Invalid value for input parameter \'sandbox\'.')
    }
}
