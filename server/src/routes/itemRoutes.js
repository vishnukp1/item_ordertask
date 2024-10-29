import express from 'express';
import { createItem, getItems } from '../controllers/itemController.js';
import tryCatch from '../middleware/tryCatch.js';
import upload from "../middleware/multer.js";
const router = express.Router();

router.post('/', upload.array('images', 5), tryCatch(createItem));
router.get('/', tryCatch(getItems));

export default router;
