import express from 'express';
import {
  createSupplier,
  getSuppliers,

} from '../controllers/supplierController.js';
import tryCatch from '../middleware/tryCatch.js';
const router = express.Router();

router.post('/', tryCatch(createSupplier));
router.get('/', tryCatch(getSuppliers));


export default router;
