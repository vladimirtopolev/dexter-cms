import {Router} from "express";
import pageTreeController from './controllers/page-tree.controller';

export default (): Router => {
    const moduleRootRouter = Router();

    moduleRootRouter.route('/tree')
        .get(pageTreeController.getTree);

    moduleRootRouter.get('/byPath', pageTreeController.getEntityByPath);
    moduleRootRouter.post('', pageTreeController.createEntity);
    moduleRootRouter.delete('/:id', pageTreeController.deleteEntity);
    moduleRootRouter.get('/:id', pageTreeController.getEntity);
    moduleRootRouter.put('/:id', pageTreeController.updateEntity);

    moduleRootRouter.get('/:id/parentPath', pageTreeController.getParentPath);


    return moduleRootRouter;
}
