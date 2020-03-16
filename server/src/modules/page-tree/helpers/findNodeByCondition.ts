import {EntityBase, TreeEntity} from './buildTree';

const findNodeByCondition = <T extends EntityBase>(condition: (page: TreeEntity<T>) => boolean, tree: TreeEntity<T>[]) => {
    let i = 0;
    while (i < tree.length) {
        const node = traverseTree(condition, tree[i]);
        if (node) {
            return node;
        } else {
            i++;
        }
    }
    return null;
};

function traverseTree<T extends EntityBase>(condition: (page: TreeEntity<T>) => boolean, root: TreeEntity<T>) {
    let visitedNodes = [root];
    let pointer = null;

    while (visitedNodes.length > 0) {
        pointer = visitedNodes.pop();
        if (condition(pointer)) {
            return pointer;
        }
        visitedNodes.push(...pointer.children);
    }
}

export default findNodeByCondition;
