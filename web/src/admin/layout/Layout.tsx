import React, {ReactNode} from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';

import styles from './Layout.module.scss';

type LayoutProps = {
    children?: ReactNode
}

export default ({children}: LayoutProps) => {
    return (
        <div className={styles.Layout}>
            <Header/>
            <div className={styles.Layout__contentWrapper}>
                <div className={styles.Layout__toolbar}>
                    <Toolbar/>
                </div>
                <div className={styles.Layout__content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
