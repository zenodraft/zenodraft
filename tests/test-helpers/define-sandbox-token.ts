export const define_sandbox_token = (token='faux_zenodo_sandbox_token') => {
    if (process.env.ZENODO_SANDBOX_ACCESS_TOKEN === undefined) {
        process.env.ZENODO_SANDBOX_ACCESS_TOKEN = token
    }
}
