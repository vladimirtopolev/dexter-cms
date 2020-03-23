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

export enum LINK_TYPES {
    INTERNAL = 'internal',
    EXTERNAL = 'external'
}

type LinkValue = {
    value: string,
    type: LINK_TYPES
}

export default ({state, path, changeState}: LinkValueComponentProps) => {
    const [isOpen, changeModalState] = useState(false);
    const toggle = () => changeModalState(!isOpen);

    const saveLink = (link: LinkValue) => {
        changeState(path, link);
    };

    const link = _.get<LinkValue>(state, path, {
        value: '/',
        type: LINK_TYPES.INTERNAL
    });

    return (
        <div className={styles.LinkValue}>
            <div className={styles.LinkValue__label}>Ссылка</div>
            <div className={styles.LinkValue__content}>
                <div className={styles.LinkValue__valueWrapper}>
                    <div className={styles.LinkValue__value}>
                        {link.value}
                    </div>
                </div>
                <button className={styles.LinkValue__toolbar}
                        onClick={toggle}>
                    <i className="far fa-edit"/>
                </button>
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
        changeLinkInMemory({...linkInMemory, type: tab});
        changeTab(tab);
    };

    useEffect(() => {
        changeLinkInMemory(link);
        changeActiveTab(link.type);
    }, [link]);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>Редактировать ссылку</ModalHeader>
            <ModalBody>
                <Nav tabs>
                    {Object.keys(LINK_CONFIGURATION).map(key => {
                        const type = LINK_CONFIGURATION[key].type;
                        return (
                            <NavItem>
                                <NavLink
                                    className={cn({active: activeTab === type})}
                                    onClick={() => {
                                        changeActiveTab(type);
                                    }}>
                                    Внутрення ссылка
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
                <TabContent activeTab={activeTab}>
                    {Object.keys(LINK_CONFIGURATION).map(key => {
                        const {type, Renderer} = LINK_CONFIGURATION[key];
                        return (
                            <TabPane tabId={type}>
                                <Renderer saveLink={saveLink} toggle={toggle} link={linkInMemory}/>
                            </TabPane>
                        );
                    })}
                </TabContent>
            </ModalBody>
        </Modal>
    );
}
