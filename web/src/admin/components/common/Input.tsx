import React, {ReactNode} from 'react';
import styles from './Input.module.scss';

type InputProps = {
    label: string | (() => ReactNode),
    name: string,
    value: any,
    onChange: (newVal: any) => void
}

export function isReactComponent(value: any): value is (() => ReactNode) {
    return typeof value === 'function';
}

export default ({label, name, value, onChange}: InputProps) => {
    return (
        <div className={styles.Input}>
            <div className={styles.Input__label}>{isReactComponent(label) ? label(): label}</div>
            <div className={styles.Input__inputWrapper}>
                <input type="text"
                       className={styles.Input__input}
                       value={value}
                       onChange={e => onChange(e.target.value)}/>
            </div>
        </div>
    );
}
