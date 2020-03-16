import {EntityBase, TreeEntity} from './buildTree';


interface EntityWithPath extends EntityBase {
    path: string
}

function getPageByPath<T extends EntityWithPath>(path: string, tree: TreeEntity<T>[]): TreeEntity<T> | null {
    const partialParts = path.split('/');

    let pointer = tree[0];
    if (partialParts[1] === ''){
        return pointer;
    }

    let index = 1;
    while(index <= partialParts.length-1){
        pointer = pointer.children.find(p => p.content.path === partialParts[index]);
        index++;
        if (!pointer) {
            return null;
        }
    }
    return pointer;
}


export default getPageByPath;
