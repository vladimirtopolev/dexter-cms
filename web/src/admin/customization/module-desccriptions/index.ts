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
                    defaultValue: '',
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
