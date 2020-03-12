import React from 'react';
import styles from './Checkbox.module.scss';
import cn from 'classnames';

interface CheckboxProps {
    onChange: () => any,
    value:boolean,
    className?:string
}

export default ({onChange, className, value}: CheckboxProps) => {
    return (
        <div className={cn(className, styles.Checkbox)}>
            <input type="checkbox"
                   className={styles.Checkbox__checkbox}
                   checked={value}
                   onChange={onChange}/>
            <span className={styles.Checkbox__checkmark}/>
        </div>
    );
}
