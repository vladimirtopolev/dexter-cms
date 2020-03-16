import axios from 'axios';

export function getPageByPath<T>(path: string, callback?: (page: T) => void): Promise<T> {
    return axios.get<T>('/api/pages/byPath', {params: {path}})
        .then(res => {
            callback && callback(res.data);
            return res.data;
        });
}
