import {Request, Response} from 'express';
import {PageEntityModel, PageEntityDocument} from '../models/page-tree.model';
import buildTree, {TreeEntity} from '../helpers/buildTree';
import findParentNode from '../helpers/findParentNode';
import {Types} from 'mongoose'

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

    createEntity = async (req: Request, res: Response) => {
        try {
            const {locale, parentPath, title, content} = req.body;

            const savedPage = await PageEntityModel.create({
                locale,
                parentPath,
                title,
                content
            });
            this.addPageInTree(parentPath, savedPage.toObject());
            res.json(savedPage);
        } catch (e) {
            console.log(e);
            res.send('Error');
        }
    };
}

export default new PageTreeController();

