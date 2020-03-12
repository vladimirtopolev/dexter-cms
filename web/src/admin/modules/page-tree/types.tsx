import {PageModule} from '../types';

export type PageItem = {
    _id: any,
    title: string,
    parentPath: string | null,
    locale: string,
    content?: PageModule[]
}
