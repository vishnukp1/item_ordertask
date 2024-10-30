import express from 'express';
import { createItem, getItems } from '../controllers/itemController.js';
import tryCatch from '../middleware/tryCatch.js';
import upload from "../middleware/multer.js";
const router = express.Router();

router.post('/',upload.single('file'), tryCatch(createItem));
router.get('/', tryCatch(getItems));

export default router;
