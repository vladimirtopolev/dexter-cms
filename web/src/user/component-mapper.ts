import {Title} from './components/Title';
import {User} from './components/User'

export type BaseUserComponentProps = {
    state: any,
    style?: any,
    renderChildrenComponents?: () => React.ReactNode[] | null,
    [extraProps: string]: any
}

export const componentMapper: {[k: string]: React.ComponentType<BaseUserComponentProps>} = {
    'TitleComponent': Title,
    'UserComponent': User
};
