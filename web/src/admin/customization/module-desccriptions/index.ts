import {BasePageModule} from '../../modules/types';

const modules: Array<BasePageModule> = [
    {
        title: 'Промо модуль',
        description: {
            type: 'object',
            component: 'PromoModule',
            properties: {
                image: {
                    type: 'image',
                    title: 'Изображение'
                },
                title: {
                    type: 'input',
                    title: 'Заголовок',
                    defaultValue: '',
                },
                subtitle: {
                    type: 'input',
                    title: 'Заголовок',
                    defaultValue: ''
                },

            }
        }
    },
    {
        title: 'Promo',
        description: {
            type: 'object',
            properties: {
                title1: {
                    type: 'input',
                    title: 'Заголовок',
                    defaultValue: '',
                    component: 'TitleComponent'
                },
                user: {
                    type: 'object',
                    component: 'UserComponent',
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
                        component: 'UserComponent',
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
