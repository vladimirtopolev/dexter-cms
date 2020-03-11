import React from 'react';

import Logo from './Logo';


import styles from './Header.module.scss';

export default () => {
    return (
        <nav className={styles.Header}>
            <Logo/>
        </nav>
    );
}
