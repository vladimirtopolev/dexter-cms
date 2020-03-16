import {EntityBase, TreeEntity} from './buildTree';


interface EntityWithPath extends EntityBase {
    path: string
}

function getPagePath<T extends EntityWithPath>(pageId: any, tree: TreeEntity<T>[]) {
    if (tree[0].content._id.toString() === pageId.toString()){
        return '/';
    }
    return traverseTree(pageId, tree[0]);
}


function traverseTree<T extends EntityWithPath>(pageId: any, root: TreeEntity<T>): string | undefined {
    let visitedNodes = [root];
    let pointer = 0;

    while (pointer < visitedNodes.length) {
        if (visitedNodes[pointer].content._id.toString() === pageId.toString()){
            return calculatePath(visitedNodes[pointer], visitedNodes)
        }
        visitedNodes.push(...visitedNodes[pointer].children);
        pointer++;
    }
}

function calculatePath<T extends EntityWithPath>(lastNode: TreeEntity<T>, queue: TreeEntity<T>[]) {
    let path = lastNode.content.path;
    let prevPointer = lastNode;

    while (queue.length > 1) {
        const entity = queue.pop();
        if (entity.content._id.toString() === prevPointer.content.parentPath.toString()) {
            prevPointer = entity;
            path = `${entity.content.path}/${path}`;
        }
    }
    return `/${path}`;
}

export default getPagePath;
