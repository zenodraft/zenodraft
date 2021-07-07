export const define_token = (token='faux_zenodo_token') => {
    if (process.env.ZENODO_ACCESS_TOKEN === undefined) {
        process.env.ZENODO_ACCESS_TOKEN = token
    }
}
