import React from 'react';
import _ from 'lodash';
import {BuildAdminEditElementProps} from '../../helpers/buildAdminEditElement';
import {ImageDescription} from '../../../../../types';

import styles from './ImageValue.module.scss';

interface ImageValueComponentProps extends BuildAdminEditElementProps {
    description: ImageDescription
}

export default ({description, state, path}: ImageValueComponentProps) => {
    const image = _.get(state, path, description.defaultValue);


    return (
        <div className={styles.ImageValue}>
            <div className={styles.ImageValue__title}>{description.title}</div>
            <div className={styles.ImageValue__content}>

            </div>
        </div>
    );
}



