export const helpers_get_api = (sandbox: boolean): string => {
    return `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`
}
