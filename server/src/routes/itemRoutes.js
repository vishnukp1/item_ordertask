import express from 'express';
import { createItem, getItems } from '../controllers/itemController.js';
import tryCatch from '../middleware/tryCatch.js';

const router = express.Router();

router.post('/',tryCatch(createItem));
router.get('/', tryCatch(getItems));

export default router;
