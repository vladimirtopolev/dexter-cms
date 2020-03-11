import {EntityBase, TreeEntity} from './buildTree';

const findParentNode = <T extends EntityBase>(parentPath: any, tree: TreeEntity<T>[]) => {
    let i = 0;
    while (i < tree.length) {
        const node = traverseRoot(parentPath, tree[i]);
        if (node) {
            return node;
        } else {
            i++;
        }
    }
    return null;
};

function traverseRoot<T extends EntityBase>(parentPath: any, root: TreeEntity<T>) {
    let visitedNodes = [root];
    let pointer = null;

    while (visitedNodes.length > 0) {
        pointer = visitedNodes.pop();
        if (pointer.content._id.toString() === parentPath.toString()) {
            return pointer;
        }
        visitedNodes.push(...pointer.children);
    }
}

export default findParentNode;
