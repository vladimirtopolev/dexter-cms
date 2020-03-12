import React, { ReactNode, useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './Dropdown.module.scss';

type DropdownItemDescription = {
    title: string,
    onClick: () => any
}
type DropdownProps = {
    children: ReactNode,
    dropdownItems: Array<DropdownItemDescription>
}

export default ({children, dropdownItems}: DropdownProps) => {
    const [isOpen, changeState] = useState(false);

    const closeMenu = () => {
        changeState(false);
    };

    useEffect(() => {
        document.addEventListener('click', closeMenu, {capture: true});
        return () => document.removeEventListener('click', closeMenu);
    }, []);

    return (
        <div className={styles.Dropdown}>
            <button onClick={(e) => {
                e.stopPropagation();
                changeState(!isOpen);
            }}
                    className={styles.Dropdown__header}>{children}</button>
            <div className={cn(styles.Dropdown__menu, {
                [styles.Dropdown__menu_open]: isOpen
            })}>
                {dropdownItems.map(({title, onClick}, i) => {
                    return (
                        <button key={i}
                                onClick={() => {
                                    onClick();
                                    changeState(false);
                                }}
                                className={styles.Dropdown__item}>
                            {title}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
