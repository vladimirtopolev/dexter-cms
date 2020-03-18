import axios from 'axios';
import {PageItem} from '../../admin/modules/page-tree/types';

export function getPageByPath(path: string, callback?: (page: PageItem) => void): Promise<PageItem> {
    return axios.get<{content: PageItem}>('/api/pages/byPath', {params: {path}})
        .then(res => {
            callback && callback(res.data.content);
            return res.data.content;
        });
}
