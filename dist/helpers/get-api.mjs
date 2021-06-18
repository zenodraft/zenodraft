export const helpers_get_api = (sandbox) => {
    return `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`;
};
