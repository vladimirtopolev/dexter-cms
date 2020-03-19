import React, {useEffect, useRef, useState} from 'react';
import styles from './PageView.module.scss';
import ReactResizeDetector from 'react-resize-detector';
import {PageItem} from '../../page-tree/types';

type PageViewProps = {
    pagePath: string | undefined,
    page: PageItem | undefined
};

export default ({pagePath, page}: PageViewProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [contentWidth, changeContentWidth] = useState<number>(1680);

    useEffect(() => {
        contentRef.current && changeContentWidth(contentRef.current.clientWidth);
    });

    useEffect(() => {
        console.log('-----', iframeRef.current?.contentWindow?.dispatchEvent);
        iframeRef.current?.contentWindow?.dispatchEvent(new CustomEvent('custom', {
            detail: {page}
        }));
    }, [page, iframeRef.current]);

    if (!pagePath) {
        return null;
    }
    return (
        <div className={styles.PageView}>
            <div className={styles.PageView__header}></div>
            <ReactResizeDetector handleWidth
                                 onResize={() => contentRef.current && changeContentWidth(contentRef.current.clientWidth)}
            >
                <div className={styles.PageView__content} ref={contentRef}>
                    <iframe src={pagePath}
                            ref={iframeRef}
                            className={styles.PageView__iframe}
                            style={{transform: `scale(${contentWidth / 1680})`}}/>
                </div>
            </ReactResizeDetector>
        </div>
    );
}
