import express from 'express';
import MethodsController from '../controllers/methods.js';

const router = express.Router();

router.get('/', MethodsController.getMethods);
router.get('/:id', MethodsController.getMethodById);

export default router;