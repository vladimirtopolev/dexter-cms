import {BasePageModule} from '../../modules/types';

const modules: Array<BasePageModule> = [
    {
        title: 'Promo',
        description: {
            type: 'object',
            properties: {
                title1: {
                    type: 'input',
                    title: 'Заголовок',
                    defaultValue: ''
                },
                user: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'input',
                            title: 'Name',
                            defaultValue: ''
                        },
                        email: {
                            type: 'input',
                            title: 'Email',
                            defaultValue: '',
                        }
                    },
                },
                roles: {
                    type: 'array',
                    title: '<%=name%>',
                    item: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'input',
                                title: 'Name',
                                defaultValue: 'Студент',
                            },
                            role: {
                                type: 'input',
                                title: 'Role',
                                defaultValue: 'Role',
                            }
                        }
                    }
                }
            }
        }
    },
    {
        title: 'Slider',
        description: {
            type: 'object',
            properties: {
                title1: {
                    type: 'input',
                    title: 'Заголовок',
                    defaultValue: '',
                }
            }
        }
    }
];
export default modules;
