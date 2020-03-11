export type TreeEntity<T> = {
    content: T,
    children: TreeEntity<T>[],
    expanded?: boolean
}

export type EntityBase = {
    _id: any,
    parentPath: any
}

const buildTree =<T extends EntityBase> (parentPath: string | null, pages: T[]): TreeEntity<T>[] => {
    type ReduceType = {
        currentPages: T[],
        restPages: T[]
    }
    const splittedPages = pages.reduce<ReduceType>((memo, page) => {
        const handledParentPath = parentPath === null ? null : parentPath.toString();
        const handledPageParentPath = page.parentPath === null ? null : page.parentPath.toString();
        const key = (handledPageParentPath === handledParentPath) ? 'currentPages' : 'restPages';
        return Object.assign(memo, {
            [key]:memo[key].concat(page)
        });
    }, {currentPages: [], restPages: []});

    return splittedPages.currentPages.map(page => ({
        content: page,
        children: buildTree(page._id, splittedPages.restPages)
    }));
};

export default buildTree;
