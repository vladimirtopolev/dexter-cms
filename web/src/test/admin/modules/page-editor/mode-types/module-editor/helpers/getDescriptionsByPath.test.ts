import {BaseModuleDescription} from '../../../../../../../admin/modules/types';
import {v1 as uid} from 'uuid';
import getDescriptionByPath
    from '../../../../../../../admin/modules/page-editor/mode-types/module-editor/helpers/getDescriptionByPath';


const helpTags = [
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid(),
    uid()
];
const DESCRIPTION: BaseModuleDescription = {
    type: 'object',
    _tag: helpTags[0],
    properties: {
        field1: {
            type: 'input',
            _tag: helpTags[1],
            title: 'Заголовок',
            defaultValue: ''
        },
        field2: {
            type: 'object',
            _tag: helpTags[2],
            properties: {
                field1: {
                    type: 'input',
                    _tag: helpTags[3],
                    title: 'Name',
                    defaultValue: ''
                },
                field2: {
                    type: 'input',
                    _tag: helpTags[4],
                    title: 'Email',
                    defaultValue: '',
                }
            },
        },
        field3: {
            type: 'array',
            _tag: helpTags[5],
            item: {
                type: 'object',
                _tag: helpTags[6],
                properties: {
                    field1: {
                        type: 'input',
                        _tag: helpTags[7],
                        title: 'Name',
                        defaultValue: 'Студент',
                    }
                }
            }
        }
    }
};

describe('getDescription', () => {

    it('rootPath', (done) => {
        expect(getDescriptionByPath(DESCRIPTION, '')._tag).toEqual(helpTags[0]);
        done();
    });

    it('the 2d level of path for Object type', (done) => {
        expect(getDescriptionByPath(DESCRIPTION, 'field1')._tag).toEqual(helpTags[1]);
        expect(getDescriptionByPath(DESCRIPTION, 'field2')._tag).toEqual(helpTags[2]);
        done();
    });
    it('the 3d level of path for Object types', (done) => {
        expect(getDescriptionByPath(DESCRIPTION, 'field2.field1')._tag).toEqual(helpTags[3]);
        expect(getDescriptionByPath(DESCRIPTION, 'field2.field2')._tag).toEqual(helpTags[4]);
        done();
    });

    it('the 2d level of path for Array type', (done) => {
        expect(getDescriptionByPath(DESCRIPTION, 'field3')._tag).toEqual(helpTags[5]);
        expect(getDescriptionByPath(DESCRIPTION, 'field3.0')._tag).toEqual(helpTags[6]);
        expect(getDescriptionByPath(DESCRIPTION, 'field3.4')._tag).toEqual(helpTags[6]);
        done();
    });
    it('the 3d level of path for Array type', (done) => {
        expect(getDescriptionByPath(DESCRIPTION, 'field3.0.field1')._tag).toEqual(helpTags[7]);
        done();
    });

});
