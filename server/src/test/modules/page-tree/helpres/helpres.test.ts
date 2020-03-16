import {Types} from "mongoose";

import buildTree, {EntityBase, TreeEntity} from '../../../../modules/page-tree/helpers/buildTree';
import findParentNode  from '../../../../modules/page-tree/helpers/findParentNode';
import getPageByPath  from '../../../../modules/page-tree/helpers/getPageByPath';
import getPagePath  from '../../../../modules/page-tree/helpers/getPagePath';


type Entity = {
    _id: Types.ObjectId,
    title: string,
    parentPath: any
}

type ExpectedTreeEntity = {
    _id: Types.ObjectId,
    children?: ExpectedTreeEntity[]
}

const ObjectIds = [
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId()
];

const notUsedObjectId = new Types.ObjectId();

function validateTree(calculatedTree: TreeEntity<Entity>[], expectedTree: ExpectedTreeEntity[]) {
    expect(calculatedTree.length).toEqual(expectedTree.length);
    calculatedTree.map((item, i)=> {
        expect(item.content._id).toEqual(expectedTree[i]._id);
        validateTree(item.children, expectedTree[i].children)
    });
}

interface PageEntity extends EntityBase{
    title: string,
    path: string
}


describe('tree structure helpres', () => {

    const pages: PageEntity[] = [
        // root1
        {
            _id: ObjectIds[0],
            title: 'root1',
            path: 'root1',
            parentPath: null
        },
        {
            _id: ObjectIds[1],
            title: 'children1_1',
            path: 'children1_1',
            parentPath: ObjectIds[0]
        },
        {
            _id: ObjectIds[2],
            title: 'children1_1_1',
            path: 'children1_1_1',
            parentPath: ObjectIds[1]
        },
        {
            _id: ObjectIds[3],
            title: 'children1_1_2',
            path: 'children1_1_2',
            parentPath: ObjectIds[1]
        },
        {
            _id: ObjectIds[4],
            title: 'children1_2',
            path: 'children1_2',
            parentPath: ObjectIds[0]
        },
        {
            _id: ObjectIds[5],
            title: 'children1_2_1',
            path: 'children1_2_1',
            parentPath: ObjectIds[4]
        },
        // root2
        {
            _id: ObjectIds[6],
            title: 'root2',
            path: 'root2',
            parentPath: null
        },
        {
            _id: ObjectIds[7],
            title: 'children2_1',
            path: 'children2_1',
            parentPath: ObjectIds[6]
        },
        {
            _id: ObjectIds[8],
            title: 'children2_2',
            path: 'children2_2',
            parentPath: ObjectIds[6]
        },
        {
            _id: ObjectIds[9],
            title: 'children2_2_1',
            path: 'children2_2_1',
            parentPath: ObjectIds[8]
        },
    ];

    const expectedTree: ExpectedTreeEntity[] = [
        {
            _id: ObjectIds[0],
            children: [
                {
                    _id: ObjectIds[1],
                    children: [
                        {
                            _id: ObjectIds[2],
                            children: []
                        },
                        {
                            _id: ObjectIds[3],
                            children: []
                        }
                    ]
                },
                {
                    _id: ObjectIds[4],
                    children: [
                        {
                            _id: ObjectIds[5],
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            _id: ObjectIds[6],
            children: [
                {
                    _id: ObjectIds[7],
                    children: []
                },
                {
                    _id: ObjectIds[8],
                    children: [
                        {
                            _id: ObjectIds[9],
                            children: []
                        }
                    ]
                }
            ]
        }
    ];

    it('buildTree', (done) => {
        const calculatedTree = buildTree(null, pages);
        validateTree(calculatedTree, expectedTree);
        done();
    });

    it('findParentNode', (done) => {
        const tree = buildTree(null, pages);

        expect(findParentNode(ObjectIds[0], tree).content._id).toEqual(ObjectIds[0]);
        expect(findParentNode(ObjectIds[1], tree).content._id).toEqual(ObjectIds[1]);
        expect(findParentNode(ObjectIds[2], tree).content._id).toEqual(ObjectIds[2]);
        expect(findParentNode(ObjectIds[3], tree).content._id).toEqual(ObjectIds[3]);
        expect(findParentNode(ObjectIds[4], tree).content._id).toEqual(ObjectIds[4]);
        expect(findParentNode(ObjectIds[5], tree).content._id).toEqual(ObjectIds[5]);
        expect(findParentNode(ObjectIds[6], tree).content._id).toEqual(ObjectIds[6]);
        expect(findParentNode(ObjectIds[7], tree).content._id).toEqual(ObjectIds[7]);
        expect(findParentNode(ObjectIds[8], tree).content._id).toEqual(ObjectIds[8]);
        expect(findParentNode(ObjectIds[9], tree).content._id).toEqual(ObjectIds[9]);

        expect(findParentNode(notUsedObjectId, tree)).toBeNull();
        done();
    });


    it('getPageByPath', (done) => {
        const tree = buildTree(null, pages);

        expect(getPageByPath('/', tree).content._id).toEqual(ObjectIds[0]);

        expect(getPageByPath('/children1_1', tree).content._id).toEqual(ObjectIds[1]);
        expect(getPageByPath('/children1_1/children1_1_1', tree).content._id).toEqual(ObjectIds[2]);
        expect(getPageByPath('/children1_1/children1_1_2', tree).content._id).toEqual(ObjectIds[3]);

        expect(getPageByPath('/children1_2', tree).content._id).toEqual(ObjectIds[4]);
        expect(getPageByPath('/children1_2/children1_2_1', tree).content._id).toEqual(ObjectIds[5]);

        expect(getPageByPath('/children1_3', tree)).toBeNull();
        expect(getPageByPath('/children1_3/children1_3_1', tree)).toBeNull();
        expect(getPageByPath('/children1_3/children1_3_1/children1_3_1_1', tree)).toBeNull();

        expect(getPageByPath('/children1_1/children1_1_3', tree)).toBeNull;
        expect(getPageByPath('/children1_1/children1_1_1/children1_1_1_1', tree)).toBeNull;

        done();
    });

    it('getPagePath', (done) => {
        const tree = buildTree(null, pages);

        expect(getPagePath(ObjectIds[1], tree)).toEqual('/children1_1');
        expect(getPagePath(ObjectIds[2], tree)).toEqual('/children1_1/children1_1_1');
        expect(getPagePath(ObjectIds[3], tree)).toEqual('/children1_1/children1_1_2');
        expect(getPagePath(ObjectIds[4], tree)).toEqual('/children1_2');
        expect(getPagePath(ObjectIds[5], tree)).toEqual('/children1_2/children1_2_1');
        expect(getPagePath(ObjectIds[0], tree)).toEqual('/');
        done();
    })

});
