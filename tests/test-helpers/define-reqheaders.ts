interface NamedParameters {
    json?: boolean,
    token: string
}

export const define_reqheaders = ({json, token}: NamedParameters) => {

    let headers = {
        'Authorization': `Bearer ${token}`
    }
    return json === true ? {...headers, ...{'Content-Type': 'application/json'}} : headers
}
