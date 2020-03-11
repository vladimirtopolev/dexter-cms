import React from 'react';
import styles from './Logo.module.scss';

export default () => {
    return (
        <div className={styles.Logo}>
            <div className={styles.Logo__image}></div>
            <div className={styles.Logo__text}>Admin panel</div>
        </div>
    );
}
