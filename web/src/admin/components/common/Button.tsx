import React, {ReactEventHandler, ReactNode} from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    children: ReactNode,
    onClick: ReactEventHandler
}

export default ({children, onClick}: ButtonProps) => {
    return (
        <button onClick={onClick} className={styles.Button}>
            {children}
        </button>
    );
}
