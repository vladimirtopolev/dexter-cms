import React, {RefObject, useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './NodeContentRenderer.module.scss';
import {NodeContentRendererProps} from '../../../components/dnd-tree/themes/default/customizeNodeContentRenderer';

type ContextMenuState = {
    isOpen: boolean,
    x: number,
    y: number
}

const Node = (props: NodeContentRendererProps) => {
    const [contextMenuState, changeContextMenuState] = useState<ContextMenuState>({
        isOpen: false,
        x: 0, y: 0
    });

    console.log(props);
    const closeContextMenu = () => changeContextMenuState({...contextMenuState, isOpen: false});

    useEffect(() => {
        document.addEventListener('click', closeContextMenu);
        return () => document.removeEventListener('click', closeContextMenu);
    }, []);

    return (
        <div className={styles.nodeContent}
             onContextMenu={(e) => {
                 const parentEl =  (props.parentRef as RefObject<HTMLElement>).current as HTMLElement;
                 e.preventDefault();
                 changeContextMenuState({
                     isOpen: true,
                     x: e.pageX - parentEl.offsetLeft,
                     y: e.pageY - parentEl.offsetTop
                 });
             }}>
            {props.node.content.title}
            <div className={styles.toolBar}>
                <button className={styles.btn}>
                    <i className="far fa-trash-alt"/>
                </button>
            </div>
            <ul
                className={cn(styles.contextMenu, {
                    [styles.contextMenu_open]: contextMenuState.isOpen
                })}
                style={{
                    top: contextMenuState.y,
                    left: contextMenuState.x
                }}
            >
                <li className={styles.contextMenu__item}>
                    <a href="#"
                       className={styles.contextMenu__link}
                       onClick={(e) => {

                       }}>
                        Редактировать
                    </a>
                </li>
                <li className={styles.contextMenu__item}>
                    <a href="#"
                       className={styles.contextMenu__link}
                       onClick={() => {

                       }}>
                        Создать страницу
                    </a>
                </li>
                <li className={styles.contextMenu__item}>
                    <a href="#"
                       className={styles.contextMenu__link}
                       onClick={(e) => {
                           console.log(props.treeId, props.treeIndex);
                           props.deleteNode(props.node);
                           e.preventDefault();
                       }}>

                        Удалить
                    </a>
                </li>

            </ul>
        </div>
    );
};

export default (props: NodeContentRendererProps) => {
    //const [isOpen, changeContextMenuState] = useState(true);

    return <Node {...props}/>;
}
