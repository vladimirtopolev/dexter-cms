import config from '../../../../config/config.json';
import axios from 'axios';

export function getTree(callback: (data: any) => void) {
    axios.get(`${config.path}/api/pages/tree`)
        .then(res => {
            console.log(res);
            callback(res.data);
        });
}

export function createPage<T>(parentPath: string | null, page: Partial<T>, callback?: (page: T) => void) {
    axios.post(`${config.path}/api/pages`, {
        ...page,
        parentPath
    }).then((res) => {
        callback && callback(res.data);
    });
}

export function deletePage(_id: string, callback?: () => void) {
    axios.delete(`${config.path}/api/pages/${_id}`)
        .then(() => callback && callback());
}

export function getPage<T>(id: string, callback?: (page: T) => void): Promise<T> {
    return axios.get<T>(`${config.path}/api/pages/${id}`)
        .then(res => {
            callback && callback(res.data);
            return res.data;
        });
}

export function getPagePath(id: string): Promise<string> {
    return axios.get(`${config.path}/api/pages`)
        .then()
}

export function updatePage<T>(id: string, page: T) {
    axios.put(`${config.path}/api/pages/${id}`, page);
}
