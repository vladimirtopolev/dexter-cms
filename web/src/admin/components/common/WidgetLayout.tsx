import React, {ReactNode} from 'react';
import cn from 'classnames';

import styles from './WidgetLayout.module.scss';

type WidgetLayoutProps = {
    children: ReactNode,
    title: string,
    contentWithoutPadding?: boolean
}

export default ({title, children, contentWithoutPadding}: WidgetLayoutProps) => {
    return (
        <div className={styles.Widget}>
            <div className={styles.Widget__title}>
                {title}
            </div>
            <div className={cn(styles.Widget__content, {
                [styles.Widget__content_withoutPadding]: contentWithoutPadding
            })}>
                {children}
            </div>
        </div>
    );
}
