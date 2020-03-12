import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

import styles from './ModalViewPageModuleDescription.module.scss';
import {BasePageModule} from '../../../../../../types';
import moduleTemplates from '../../../../../../../customization/module-desccriptions';

type ModalViewProps = {
    isOpen: boolean,
    toggle: () => void,
    addModuleToPage: (module: BasePageModule) => void
};

export default ({isOpen, toggle, addModuleToPage}: ModalViewProps) => {
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader toggle={toggle}>Добавить модуль</ModalHeader>
            <ModalBody>
                {moduleTemplates.map((module, i) => {
                    return (
                        <div className={styles.ModuleItem} key={i}>
                            <div className={styles.ModuleItem__title}>
                                {module.title}
                            </div>
                            <div className={styles.ModuleItem__toolbar}>
                                <button onClick={() => addModuleToPage(module)}>+</button>
                            </div>
                        </div>
                    )
                })}
            </ModalBody>
        </Modal>
    )
}
