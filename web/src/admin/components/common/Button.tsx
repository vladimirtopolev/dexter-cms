import React, {ReactEventHandler, ReactNode} from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

export enum BUTTON_STYLES {
    INVERSE = 'inverse'
}

type ButtonProps = {
    children: ReactNode,
    onClick: ReactEventHandler,
    buttonStyle?: BUTTON_STYLES,
    disabled?: boolean,
    className?: string
}

export default ({children, onClick, buttonStyle, className, disabled}: ButtonProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={cn(className, styles.Button, {
            [styles.Button_inverse]: buttonStyle && buttonStyle === BUTTON_STYLES.INVERSE
        })}>
            {children}
        </button>
    );
}
