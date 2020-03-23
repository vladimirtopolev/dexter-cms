import React, {useState} from 'react';
import cn from 'classnames';
import styles from './NodeContentRenderer.module.scss';
import {NodeContentRendererProps} from '../../../../../../../../../components/dnd-tree/themes/default/customizeNodeContentRenderer';


const Node = (props: NodeContentRendererProps) => {
    console.log(props.actions.isActivePage(props.node));
    return (
        <div className={cn(styles.nodeContent, {
            [styles.nodeContent_active]: props.actions.isActivePage(props.node)
        })}
             onClick={() => {
                 props.actions.changeActivePage(props.node);
             }}>
            <div className={styles.nodeContent__title}>
                {props.node.expanded
                    ? <i className={cn(styles.nodeContent__icon, 'fas', 'fa-folder-open')}/>
                    : <i className={cn(styles.nodeContent__icon, 'fas', 'fa-folder')}/>}
                {props.node.content.title}
            </div>
        </div>
    );
};

export default (props: NodeContentRendererProps) => {
    return <Node {...props}/>;
}
