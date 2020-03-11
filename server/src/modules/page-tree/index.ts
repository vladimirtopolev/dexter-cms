import {Router} from "express";
import pageTreeController from './controllers/page-tree.controller';

export default (): Router => {
    const moduleRootRouter = Router();

    moduleRootRouter.route('/tree')
        .get(pageTreeController.getTree);

    moduleRootRouter.post('', pageTreeController.createEntity);
    moduleRootRouter.delete('/:id', pageTreeController.deleteEntity);

    return moduleRootRouter;
}
