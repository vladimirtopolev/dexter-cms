import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import DndTree from '../../components/dnd-tree';
import {PageItem} from './types';
import config from '../../../config/config.json';

import CollapseButtonRenderer from './components/CollapseButtonRenderer';
import DragSourceRenderer from './components/DragSourceRenderer';
import NodeContentRenderer from './components/NodeContentRenderer';
import customizeDefaultTheme from '../../components/dnd-tree/themes/default';
import {TreeItem} from 'react-sortable-tree';

const pageTree: PageItem[] = [
    {
        _id: 1,
        title: 'HomePage',
        children: [
            {
                _id: 2,
                title: 'About us'
            },
            {
                _id: 3,
                title: 'Products',
                children: [
                    {
                        _id: 4,
                        title: '1'
                    },
                    {
                        _id: 5,
                        title: '2'
                    }
                ]
            }
        ]
    }
];

export default () => {
    const [treeData, changeTreeData] = useState<PageItem[]>([]);
    const parentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        axios.get(`${config.path}/api/pages/tree`)
            .then(res => {
                console.log(res);
                changeTreeData(res.data);
            })
    }, []);

    return (
        <div style={{ height: 400 }} ref={parentRef}>
                <DndTree<PageItem>
                    treeData={treeData}
                    onChange={changeTreeData}
                    rowHeight={40}
                    theme={customizeDefaultTheme({
                        specificCollapseButtonRenderer: CollapseButtonRenderer,
                        specificDragSourceRenderer: DragSourceRenderer,
                        specificNodeContentRenderer: NodeContentRenderer,
                        parentRef: parentRef,
                        deleteNode: (node: TreeItem) => {
                            console.log(node)
                        }
                    })}
                />
        </div>
    )
}
