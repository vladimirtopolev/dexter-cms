import React, {useState, useRef, useEffect} from 'react';
import DndTree from '../../components/dnd-tree';
import {PageItem} from './types';

import * as actions from './actions';
import CollapseButtonRenderer from './components/CollapseButtonRenderer';
import DragSourceRenderer from './components/DragSourceRenderer';
import NodeContentRenderer from './components/NodeContentRenderer';
import customizeDefaultTheme from '../../components/dnd-tree/themes/default';
import {TreeItem} from 'react-sortable-tree';
import findParentNode from './helpers/findParentNode';
import {TreeEntity} from './helpers/buildTree';

export default () => {
    const [treeData, changeTreeData] = useState<TreeEntity<PageItem>[]>([]);
    const parentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        actions.getTree(data => changeTreeData(data));
    }, []);

    const createNode = (newNode: PageItem) => {
        changeTreeData((prevTree) => {
            const treeEntity = {
                content: newNode,
                children: []
            };

            if (newNode.parentPath === null){
                return [...prevTree, treeEntity];
            }
            const parentNode = findParentNode(newNode.parentPath, prevTree) as TreeEntity<PageItem>;
            parentNode.expanded = true;
            parentNode.children.push(treeEntity);
            return [...prevTree];
        })
    };

    return (
        <div>
            <button onClick={() => {
                actions.createPage<PageItem>(null, {
                    title: 'Title...',
                    locale: 'en-US',
                }, page => createNode(page));
            }}>Добавить
            </button>
            <div style={{height: 800}} ref={parentRef}>
                <DndTree<TreeEntity<PageItem>>
                    treeData={treeData}
                    onChange={changeTreeData}
                    rowHeight={40}
                    theme={customizeDefaultTheme({
                        specificCollapseButtonRenderer: CollapseButtonRenderer,
                        specificDragSourceRenderer: DragSourceRenderer,
                        specificNodeContentRenderer: NodeContentRenderer,
                        parentRef: parentRef,
                        deleteNode: (deletedNode: TreeItem) => {
                            const node = deletedNode as TreeEntity<PageItem>;
                            if (node.content.parentPath === null) {
                                changeTreeData(prevTree => prevTree.filter(item => item.content._id !== node.content._id));
                            } else {
                                changeTreeData((prevTree) => {
                                    const parentNode = findParentNode(node.content.parentPath, prevTree) as TreeEntity<PageItem>;
                                    parentNode.children = parentNode.children.filter(item => item.content._id !== node.content._id)
                                    return [...prevTree];
                                })
                            }
                        },
                        createNode: (page: PageItem) => createNode(page)
                    })}
                />
            </div>
        </div>
    )
}
