import React from 'react';
import styles from './Input.module.scss';

type InputProps = {
    label: string,
    name: string,
    value: any,
    onChange: (newVal: any) => void
}

export default ({label, name, value, onChange}: InputProps) => {
    return (
        <div className={styles.Input}>
            <label className={styles.Input__label}>{label}</label>
            <div className={styles.Input__inputWrapper}>
                <input type="text"
                       className={styles.Input__input}
                       value={value}
                       onChange={e => onChange(e.target.value)}/>
            </div>
        </div>
    );
}
