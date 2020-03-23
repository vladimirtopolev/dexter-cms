import React, {useRef} from 'react';
import SortableTree, {ExtendedNodeData, ThemeProps, TreeItem} from 'react-sortable-tree';
import './styles.scss';

type DndTree<T> = {
    treeData: T[],
    onChange: (treeData: T[]) => void,
    rowHeight?: number,
    scaffoldBlockPxWidth?: number,
    theme?: ThemeProps,
    canDrag?: ((data: ExtendedNodeData) => boolean) | boolean;
}

export default function <T extends TreeItem>({treeData, onChange, rowHeight, scaffoldBlockPxWidth, theme, canDrag}: DndTree<T>) {
    const parentRef = useRef<HTMLDivElement>(null);
    return (
        <div style={{height: '100%', width: '100%'}} ref={parentRef}>
            <SortableTree treeData={treeData}
                          onChange={onChange}
                          canDrag={canDrag}
                          rowHeight={rowHeight}
                          scaffoldBlockPxWidth={scaffoldBlockPxWidth}
                          theme={theme}/>
        </div>
    );
}
