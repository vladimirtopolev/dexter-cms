import React from 'react';
import {BaseUserComponentProps} from '../../components/component-mapper';
import styles from './Promo.module.scss';

type PromoModuleState = {
    image: string,
    title: string,
    subtitle: string
}

interface PromoModuleProps extends BaseUserComponentProps {
    state: PromoModuleState
}

const PromoModule: React.FC<PromoModuleProps> = ({state}) => {
    return (
        <section className={styles.Promo}>
            <div className={styles.Promo__media}>
                <img src={state.image} className={styles.Promo__image}/>
            </div>
            <div className={styles.Promo__wrapper}>
                <div className={styles.Promo__content}>
                    <h2 className={styles.Promo__title}>{state.title}</h2>
                    <div className={styles.Promo__subtitle}>{state.subtitle}</div>
                </div>
            </div>
        </section>
    );
};

export default PromoModule;
