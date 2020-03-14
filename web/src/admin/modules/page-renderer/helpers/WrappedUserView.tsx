import React from 'react';
import _ from 'lodash';
import {BaseUserComponentProps} from '../../../../user/component-mapper';

type WrappedUserViewProps = {
    Component: React.ComponentType<BaseUserComponentProps>,
    state: any,
    path: string,
    renderChildrenComponents?: () => React.ReactNode[] | null,
}

const WrappedUserView: React.FC<WrappedUserViewProps> = ({Component, state, path, renderChildrenComponents}) => {
    return <Component
        state={_.get(state, path)}
        renderChildrenComponents={renderChildrenComponents}
    />;
};

export default WrappedUserView;
