import React, {ChangeEvent} from 'react';
import styles from './InputFileButton.module.scss';

export default ({children, onChange}: { children?: React.ReactNode, onChange: (files: FileList) => void }) => {
    return (
        <div className={styles.InputFile}>
            <input type="file"
                   className={styles.InputFile__file}
                   id="file"
                   onChange={(e) => {
                       e.target.files && onChange(e.target.files);
                   }}/>
            <label className={styles.InputFile__label} htmlFor="file">{children}</label>
        </div>
    )
}
