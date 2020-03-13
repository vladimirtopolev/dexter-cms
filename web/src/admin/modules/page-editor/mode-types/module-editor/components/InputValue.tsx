import React from 'react';
import _ from 'lodash';
import cn from 'classnames';


import {BuildAdminEditElementProps} from '../helpers/buildAdminEditElement';
import {InputDescription} from '../../../../types';
import Input from '../../../../../components/common/Input';

import styles from './InputValue.module.scss';
import Checkbox from '../../../../../components/common/Checkbox';

interface InputValueComponentProps extends BuildAdminEditElementProps {
    description: InputDescription
}

const InputValue = ({
                        path,
                        description,
                        meta,
                        state,
                        changeMeta,
                        changeState
                    }: InputValueComponentProps) => {

    const isEnabled = _.get(meta, `${path}.enabled`, true);
    console.log('PATH', path);

    const label = () => (
        <div className={styles.Label}>
            <div className={styles.Label__description}>
                {description.title}
            </div>
            <Checkbox value={isEnabled}
                      onChange={() => {
                          changeMeta(`${path}.enabled`, !isEnabled);
                      }}/>
        </div>
    );
    return (
        <div
            /*onMouseOver={() => changeSelectedPathFromAdminEditor(path)}
            onMouseOut={() => changeSelectedPathFromAdminEditor('')}
            className={cn(styles.inputValue, {[styles.inputValue_disabled]: !isEnabled})}*/>
            <div className={cn("inputValue__input")}>
                <Input label={label}
                       name="text"
                       onChange={(value) => changeState(path, value)}
                       value={_.get(state, path, description.defaultValue)}/>
            </div>
        </div>
    );
};

export default InputValue;
