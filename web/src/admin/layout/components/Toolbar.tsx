import React, {useState} from 'react';
import cn from 'classnames';
import {Link} from 'react-router-dom';

import styles from './Toolbar.module.scss';

const toolbarItems = [
    {
        name: 'Страницы',
        icon: 'fas fa-copy',
        path: '/pages-tree'
    },
    {
        name: 'Навигация',
        icon: 'fas fa-bars',
        path: '/navigation'
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

export default () => {
    const [isFlatten, changeState] = useState(false);
    return (
        <React.Fragment>
            <button className={styles.FlatMenuBtn}
                    onClick={() => changeState(!isFlatten)}>
                <i className={cn('fas', {
                    ['fa-angle-double-left']: !isFlatten,
                    ['fa-angle-double-right']: isFlatten
                })}/>
            </button>
            <ul className={cn(styles.Toolbar, {[styles.Toolbar_flatten]: isFlatten})}>
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
        </React.Fragment>
    );
}
