import React, {useEffect, useState} from 'react';
import {LINK_TYPES, ModalLink} from '../../LinkValue';

import styles from './ExternalLink.module.scss';
import Button from '../../../../../../../../components/common/Button';
import Input from '../../../../../../../../components/common/Input';

export default ({toggle, saveLink, link}: ModalLink) => {

    const [value, changeValue] = useState(link.value);

    useEffect(() => {
        changeValue(link.value);
    }, [link]);

    return (
        <div className={styles.ExternalLink}>
            <div className={styles.ExternalLink__content}>
                <Input label="Ссылка"
                       name="link"
                       value={value}
                       onChange={val => {
                           changeValue(val);
                       }}/>
            </div>
            <div className={styles.ExternalLink__toolbar}>
                <Button onClick={() => {
                    saveLink({
                        ...link,
                        type: LINK_TYPES.EXTERNAL,
                        value
                    });
                    toggle();
                }}>
                    Сохранить
                </Button>
                <Button onClick={() => {
                    toggle();
                }}>Отменить</Button>
            </div>
        </div>
    );
}
