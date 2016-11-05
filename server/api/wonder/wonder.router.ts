/**
 * GET     /api/wonder            ->  index
 * POST    /api/wonder            ->  create
 * GET     /api/wonder/:id        ->  show
 * PUT     /api/wonder/:id        ->  update
 * DELETE  /api/wonder/:id        ->  destroy
 */

let express = require('express');
import * as controller from './wonder.controller';

let router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

export {router as wonderRoutes};
