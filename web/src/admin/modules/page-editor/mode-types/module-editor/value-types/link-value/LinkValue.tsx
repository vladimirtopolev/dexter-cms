import React, {useEffect, useState, SyntheticEvent} from 'react';
import cn from 'classnames';
import {BuildAdminEditElementProps} from '../../helpers/buildAdminEditElement';
import {LinkDescription} from '../../../../../types';
import _ from 'lodash';
import {Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';

import styles from './LinkValue.module.scss';

interface LinkValueComponentProps extends BuildAdminEditElementProps {
    description: LinkDescription
}

import InternalLink from './link-types/internal/InternalLink';
import ExternalLink from './link-types/external/ExternalLink';
import Input from '../../../../../../components/common/Input';

export enum LINK_TYPES {
    INTERNAL = 'internal',
    EXTERNAL = 'external'
}

export enum LINK_TARGETS {
    NEW_WINDOW = 'new-window',
    SAME_WINDOW = 'same-window'
}

export type LinkValue = {
    value: string,
    type: LINK_TYPES,
    target?: LINK_TARGETS,
    title: string
}

export default ({state, path, changeState}: LinkValueComponentProps) => {
    const [isOpen, changeModalState] = useState(false);
    const toggle = () => changeModalState(!isOpen);

    const saveLink = (link: LinkValue) => {
        changeState(path, link);
    };

    const link = _.get<LinkValue>(state, path, {
        value: '/',
        type: LINK_TYPES.INTERNAL,
        target: LINK_TARGETS.SAME_WINDOW,
        title: ''
    });

    return (
        <div className={styles.LinkValue}>
            <div className={styles.LinkValue__label}>Ссылка</div>
            <div className={styles.LinkValue__content}>
                <div className={cn(styles.LinkValue__group, styles.Group)}>
                    <div className={styles.Group__title}>Заголовок</div>
                    <div className={styles.Group__value}>
                        <Input name="title"
                               value={link.title}
                               onChange={(title) => saveLink({...link, title})}/>
                    </div>
                </div>
                <div className={cn(styles.LinkValue__group, styles.Group)}>
                    <div className={styles.Group__title}>Ссылка</div>
                    <div className={styles.Group__value}>
                        <div className={styles.Link}>
                            <div className={styles.Link__wrapper}>
                                <div className={styles.Link__value}>
                                    {link.value}
                                </div>
                            </div>
                            <button className={styles.Link__toolbar}
                                    onClick={toggle}>
                                <i className="far fa-edit"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <LinkEditor isOpen={isOpen} toggle={toggle} link={link} saveLink={saveLink}/>
        </div>
    );
}

export type ModalLink = {
    saveLink: (link: LinkValue) => void,
    toggle: () => void,
    link: LinkValue
}


const LINK_CONFIGURATION: {
    [key: string]: {
        name: string,
        type: LINK_TYPES,
        Renderer: React.ComponentType<ModalLink>
    }
} = {
    [LINK_TYPES.INTERNAL]: {
        name: 'Внутренняя ссылка',
        type: LINK_TYPES.INTERNAL,
        Renderer: InternalLink
    },
    [LINK_TYPES.EXTERNAL]: {
        name: 'Внешняя ссылка',
        type: LINK_TYPES.EXTERNAL,
        Renderer: ExternalLink
    }
};

function LinkEditor({isOpen, toggle, link, saveLink}: { isOpen: boolean, toggle: () => void, link: LinkValue, saveLink: (link: LinkValue) => void }) {
    const [linkInMemory, changeLinkInMemory] = useState<LinkValue>(link);
    const [activeTab, changeTab] = useState<LINK_TYPES>(link.type);

    const changeActiveTab = (tab: LINK_TYPES) => {
        changeTab(tab);
        changeLinkInMemory(() => ({...linkInMemory, type: tab}));
    };

    const saveLinkHandler = (link: LinkValue) => {
        changeLinkInMemory({...link});
        changeTab(link.type);
        saveLink(link);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>Редактировать ссылку</ModalHeader>
            <ModalBody>
                <Nav tabs>
                    {Object.keys(LINK_CONFIGURATION).map(key => {
                        const {type, name} = LINK_CONFIGURATION[key];
                        return (
                            <NavItem key={key}>
                                <NavLink
                                    className={cn({active: activeTab === type})}
                                    onClick={() => {
                                        changeActiveTab(type);
                                    }}>
                                    {name}
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
                <TabContent activeTab={activeTab}>
                    {Object.keys(LINK_CONFIGURATION).map(key => {
                        const {type, Renderer} = LINK_CONFIGURATION[key];
                        return (
                            <TabPane tabId={type} key={key}>
                                <Renderer saveLink={saveLinkHandler} toggle={toggle} link={linkInMemory}/>
                            </TabPane>
                        );
                    })}
                </TabContent>
            </ModalBody>
        </Modal>
    );
}
