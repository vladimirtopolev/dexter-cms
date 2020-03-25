import React from 'react';
import styles from './Slide.module.scss';
import {SlideProps} from './Slider';

type SlideStateProps = {
    aspectRatio?: number,
    slide: SlideProps
}

export default ({slide: {image, title, description}}: SlideStateProps) => {
    return (
        <div className={styles.Slide}>
            <div className={styles.Slide__wrapper}>
                <img src={image} className={styles.Slide__image}/>
                <div className={styles.Slide__content}>
                    <h1 className={styles.Slide__title}>{title}</h1>
                    <div className={styles.Slide__description}>{description}</div>
                </div>
            </div>
        </div>
    );
}
