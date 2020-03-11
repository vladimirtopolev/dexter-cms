import React, {RefObject, useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './NodeContentRenderer.module.scss';
import {NodeContentRendererProps} from '../../../components/dnd-tree/themes/default/customizeNodeContentRenderer';
import * as actions from '../actions';
import {PageItem} from '../types';

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
                 const parentEl = (props.parentRef as RefObject<HTMLElement>).current as HTMLElement;
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
                       onClick={(e) => {
                           e.preventDefault();
                           actions.createPage<PageItem>(props.node.content._id, {title: 'Children'}, page => props.createNode(page));
                       }}>
                        Создать страницу
                    </a>
                </li>
                <li className={styles.contextMenu__item}>
                    <a href="#"
                       className={styles.contextMenu__link}
                       onClick={(e) => {
                           e.preventDefault();
                           actions.deletePage(props.node.content._id, () => props.deleteNode(props.node));
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
