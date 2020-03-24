import React, {useEffect, useRef, useState} from 'react';
import {TreeEntity} from '../../../../../../../page-tree/helpers/buildTree';
import {PageItem} from '../../../../../../../page-tree/types';
import * as actions from '../../../../../../../../api/page-tree';
import DndTree from '../../../../../../../../components/dnd-tree';
import customizeDefaultTheme from '../../../../../../../../components/dnd-tree/themes/default';
import CollapseButtonRenderer from '../../../../../../../page-tree/components/CollapseButtonRenderer';
import DragSourceRenderer from '../../../../../../../page-tree/components/DragSourceRenderer';
import NodeContentRenderer from './components/NodeContentRenderer';

import styles from './InternalLink.module.scss';
import Button from '../../../../../../../../components/common/Button';
import {LINK_TYPES, ModalLink} from '../../LinkValue';
import {getPageByPath} from '../../../../../../../../../client/api';
import {getPagePath} from '../../../../../../../../api/page-tree';

export default ({toggle, saveLink, link}: ModalLink) => {
    const [activePage, changeActivePage] = useState<TreeEntity<PageItem> | null>(null);
    const activePageRef = useRef<TreeEntity<PageItem> | null>(activePage);
    const [treeData, changeTreeData] = useState<TreeEntity<PageItem>[]>([]);

    useEffect(() => {
        actions.getTree(data => changeTreeData(data));
    }, []);

    return (
        <div className={styles.InternalLink}>
            <div className={styles.InternalLink__content}>
                <DndTree<TreeEntity<PageItem>>
                    treeData={treeData}
                    onChange={changeTreeData}
                    rowHeight={40}
                    canDrag={false}
                    theme={customizeDefaultTheme({
                        specificCollapseButtonRenderer: CollapseButtonRenderer,
                        specificDragSourceRenderer: DragSourceRenderer,
                        specificNodeContentRenderer: NodeContentRenderer,
                        actions: {
                            changeActivePage: (p: any) => {
                                changeActivePage(p);
                                activePageRef.current = p;
                                changeTreeData((t) => [...t]);
                            },
                            isActivePage: (page: TreeEntity<PageItem>) => {
                                return activePageRef.current && page.content._id === activePageRef.current.content._id;
                            }
                        }
                    })}
                />
            </div>
            <div className={styles.InternalLink__toolbar}>
                <Button onClick={() => {
                    getPagePath(activePage?.content?._id)
                        .then(pagePath => {
                            saveLink({
                                ...link,
                                type: LINK_TYPES.INTERNAL,
                                value: pagePath
                            });
                            toggle();
                        });
                }} disabled={activePage === null}>Сохранить</Button>
                <Button onClick={() => {
                    toggle();
                }}>Отменить</Button>
            </div>
        </div>
    );
}
