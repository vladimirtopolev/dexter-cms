import React, {ReactNode, useState} from 'react';
import styles from './Toolbar.module.scss';
import cn from 'classnames';

type ToolbarProps = {
    children: ReactNode
}

const flattenMenuIcon = 'fa-angle-double-right';
const openedMenuIcon = 'fa-angle-double-left';

export default ({children}: ToolbarProps) => {
    const [isFlatten, changeMenuState] = useState(false);
    const toggle = () => changeMenuState(!isFlatten);

    return (
        <div className={cn(styles.Toolbar, {
            [styles.Toolbar_flatten]: isFlatten
        })}>
            <div className={styles.Toolbar__toolbar}>
                <div className={styles.Toolbar__title}>Меню</div>
                <button onClick={toggle}
                        className={styles.Toolbar__toggleBtn}>
                    <i className={cn('fas', {
                        [openedMenuIcon]: !isFlatten,
                        [flattenMenuIcon]: isFlatten
                    })}/>
                </button>
            </div>
            <div className={styles.Toolbar__content}>
                {children}
            </div>
        </div>
    );
}
