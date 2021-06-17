export const get_api = (sandbox) => {
    return `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`;
};
