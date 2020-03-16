import {PageModule} from '../types';

export type PageItem = {
    _id: any,
    title: string,
    path: string,
    parentPath: string | null,
    locale: string,
    content: PageModule[]
}
