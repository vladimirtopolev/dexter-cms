import React, {useState} from 'react';
import cn from 'classnames';
import {Link} from 'react-router-dom';

import styles from './Toolbar.module.scss';

const toolbarItems = [
    {
        name: 'Страницы',
        icon: 'fas fa-copy',
        path: '/admin/pages-tree'
    },
    {
        name: 'Навигация',
        icon: 'fas fa-bars',
        path: '/admin/navigation'
    },
    {
        name: 'Статистика',
        icon: 'fas fa-chart-line',
        path: ''
    },
    {
        name: 'Заявки',
        icon: 'fab fa-trello',
        path: ''
    }
];

const flattenMenuIcon = 'fa-angle-double-right';
const openedMenuIcon = 'fa-angle-double-left';
export default () => {
    const [isFlatten, changeState] = useState(false);
    return (
        <div className={cn(styles.Toolbar, {[styles.Toolbar_flatten]: isFlatten})}>
            <button className={styles.FlatMenuBtn}
                    onClick={() => changeState(!isFlatten)}>
                <i className={cn('fas', {
                    [openedMenuIcon]: !isFlatten,
                    [flattenMenuIcon]: isFlatten
                })}/>
            </button>
            <ul className={cn(styles.Toolbar__menu)}>
                {toolbarItems.map((item, i) => {
                    return (
                        <li className={styles.Toolbar__item} key={i}>
                            <Link className={styles.Link} to={item.path}>
                                <i className={cn(styles.Link__icon, item.icon)}/>
                                <span className={styles.Link__text}>{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
