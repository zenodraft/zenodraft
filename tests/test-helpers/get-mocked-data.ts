import * as path from 'path'


export const get_mocked_data = (id: string) => {
    return path.join(__dirname, '..', '..', 'mocks', `${id}.json`)
}
