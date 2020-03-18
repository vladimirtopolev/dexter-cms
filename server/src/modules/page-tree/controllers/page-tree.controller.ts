import {Request, Response} from 'express';
import * as _ from 'lodash';
import {PageEntityModel, PageEntityDocument} from '../models/page-tree.model';
import buildTree, {TreeEntity} from '../helpers/buildTree';
import findParentNode from '../helpers/findParentNode';
import getPagePath from '../helpers/getPagePath';
import getPageByPath from '../helpers/getPageByPath';


import * as converter from 'cyrillic-to-latin';
import {Types} from 'mongoose';
import findNodeByCondition from '../helpers/findNodeByCondition';

class PageTreeController {
    treeEntities: TreeEntity<PageEntityDocument>[] = [];

    constructor() {
        this.calculateTree.bind(this);
        this.calculateTree();
    }

    calculateTree = () => {
        PageEntityModel.find()
            .then(pages => {
                this.treeEntities = buildTree(null, pages.map(p => p.toObject()));
            });
    };

    getTree = (req: Request, res: Response) => {
        res.json(this.treeEntities);
    };

    getEntityByPath = (req: Request, res: Response) => {
        const {path} = req.query;
        if (!path) {
            return res.status(404).json({error: 'You should set path variable in request query'});
        }
        res.json(getPageByPath(path, this.treeEntities));
    };

    addPageInTree = (parentPath: string | null, page: PageEntityDocument) => {
        const pageTreeEntity: TreeEntity<PageEntityDocument> = {
            content: page,
            children: []
        };
        if (parentPath === null) {
            this.treeEntities.push(pageTreeEntity);
        } else {
            const parentNode = findParentNode(new Types.ObjectId(parentPath), this.treeEntities);
            parentNode.children.push(pageTreeEntity);
        }
    };

    getEntityPath = async (req: Request, res: Response) => {
        const id = req.params.id;
        res.json({path: getPagePath(id, this.treeEntities)});
    };

    deletePageFromTree = (page: PageEntityDocument) => {
        if (page.parentPath === null) {
            this.treeEntities = this.treeEntities.filter(p => p.content._id.toString() !== page._id.toString());
        } else {
            const parentNode = findParentNode(new Types.ObjectId(page.parentPath), this.treeEntities);
            parentNode.children = parentNode.children.filter(p => p.content._id.toString() !== page._id.toString());
        }
    };

    updatePageInTree = (page: PageEntityDocument) => {
        const condition = (p: TreeEntity<PageEntityDocument>) => p.content._id.toString() === page._id.toString();
        const node = findNodeByCondition(condition, this.treeEntities);
        if (node) {
            node.content = page;
        }
    };

    createEntity = async (req: Request, res: Response) => {
        try {
            const {locale, parentPath, title, content} = req.body;

            const savedPage = await PageEntityModel.create({
                locale,
                parentPath,
                title,
                path: _.kebabCase(converter(title)),
                content
            });
            this.addPageInTree(parentPath, savedPage.toObject());
            res.json(savedPage);
        } catch (e) {
            console.log(e);
            res.send('Error');
        }
    };

    deleteEntity = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;

            const deletedElement = await PageEntityModel.findByIdAndDelete(id);
            this.deletePageFromTree(deletedElement.toObject());
            res.json(deletedElement);
        } catch (e) {
            console.log(e);
            res.send('Error');
        }
    };

    getEntity = (req: Request, res: Response) => {
        const {id} = req.params;
        this._getEntityById(id, res);
    };

    _getEntityById = async (id: string, res: Response) => {
        try {
            const entity = await PageEntityModel.findById(id);
            res.json(entity);
        } catch (e) {
            console.log(e);
            res.send('Error');
        }
    };

    updateEntity = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const page = req.body;
            const updatedPage = await PageEntityModel.findByIdAndUpdate(id, page, {new: true});
            this.updatePageInTree(updatedPage.toObject());
            res.json(updatedPage);
        } catch (e) {
            console.log(e);
            res.send('Error');
        }

    };

}

export default new PageTreeController();

