export const define_reqheaders = () => {
    return {
        'Authorization': `Bearer ${process.env.ZENODO_SANDBOX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
}