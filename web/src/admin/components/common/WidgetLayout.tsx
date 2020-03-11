import React, {ReactNode} from 'react';

import styles from './WidgetLayout.module.scss';

type WidgetLayoutProps = {
    children: ReactNode,
    title: string
}

export default ({title, children}:WidgetLayoutProps) => {
    return (
        <div className={styles.Widget}>
            <div className={styles.Widget__title}>
                {title}
            </div>
            <div className={styles.Widget__content}>
                {children}
            </div>
        </div>
    );
}
