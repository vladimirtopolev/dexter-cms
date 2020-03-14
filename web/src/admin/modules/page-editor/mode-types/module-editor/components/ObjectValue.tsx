import React from 'react';
import buildAdminEditElement, {BuildAdminEditElementProps} from '../helpers/buildAdminEditElement';
import {ObjectDescription} from '../../../../types';

import styles from './ObjectValue.module.scss';

interface ObjectValueComponentProps extends BuildAdminEditElementProps {
    description: ObjectDescription
}

const ObjectValue = ({
                         path,
                         description,
                         state,
                         nestedLevel,
                         backToPevNavigationStep,
                         ...rest
                     }: ObjectValueComponentProps) => {
    return (
        <React.Fragment>
            {nestedLevel === 0 &&
            <button className={styles.BackBtn}
                    onClick={() => backToPevNavigationStep()}>
                <i className="fas fa-long-arrow-alt-left"/> Назад

            </button>}
            {Object.keys(description.properties)
                .map(key => {
                    const targetPath = path === '' ? key : `${path}.${key}`;
                    return (
                        <div key={targetPath}>
                            {buildAdminEditElement({
                                path: targetPath,
                                description: description.properties[key],
                                state,
                                backToPevNavigationStep,
                                nestedLevel: nestedLevel + 1,
                                ...rest
                            })}
                        </div>);
                })}
        </React.Fragment>
    );
};

export default ObjectValue;
