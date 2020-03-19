import React from 'react';
import {Title} from './title/Title';
import {User} from './user/User';

import Promo from '../modules/promo/Promo'

export type BaseUserComponentProps = {
    state: any,
    style?: any,
    renderChildrenComponents?: () => React.ReactNode[] | React.ReactNode | null,
    [extraProps: string]: any
}

export const componentMapper: {[k: string]: React.ComponentType<BaseUserComponentProps>} = {
    'TitleComponent': Title,
    'UserComponent': User,
    'PromoModule': Promo
};
