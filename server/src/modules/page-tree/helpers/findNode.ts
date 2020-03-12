import {EntityBase, TreeEntity} from './buildTree';

const findNode = <T extends EntityBase>(page: T, tree: TreeEntity<T>[]) => {
    let i = 0;
    while (i < tree.length) {
        const node = traverseRoot(page, tree[i]);
        if (node) {
            return node;
        } else {
            i++;
        }
    }
    return null;
};

function traverseRoot<T extends EntityBase>(page: T, root: TreeEntity<T>) {
    let visitedNodes = [root];
    let pointer = null;

    while (visitedNodes.length > 0) {
        pointer = visitedNodes.pop();
        if (pointer.content._id.toString() === page._id.toString()) {
            return pointer;
        }
        visitedNodes.push(...pointer.children);
    }
}

export default findNode;
