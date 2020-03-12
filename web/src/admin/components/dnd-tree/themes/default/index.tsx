import React, {RefObject} from 'react';
import {ThemeProps, TreeItem} from 'react-sortable-tree';

import customizeTreeNodeRenderer from './customizeTreeNodeRenderer';
import customizeNodeContentRenderer, {
    CollapseButtonRendererProps, DragSourceRendererProps,
    NodeContentRendererProps
} from './customizeNodeContentRenderer';
import {PageItem} from '../../../../modules/page-tree/types';


export type CustomizeDefaultThemeProps = {
    specificNodeContentRenderer?: (props: NodeContentRendererProps) => React.ReactElement,
    specificCollapseButtonRenderer?: (props: CollapseButtonRendererProps) => React.ReactElement,
    specificDragSourceRenderer?: (props: DragSourceRendererProps) => React.ReactElement,
    deleteNode: (node: TreeItem) => void,
    createNode: (page: PageItem) => void,
    parentRef?: RefObject<HTMLElement | null>
}
export default function customizeDefaultTheme(props: CustomizeDefaultThemeProps): ThemeProps {
    return {
        treeNodeRenderer: customizeTreeNodeRenderer(),
        nodeContentRenderer: customizeNodeContentRenderer(props)
    };
}
