import express from 'express';
import { createPurchaseOrder, getPurchaseOrders } from '../controllers/purchaseOrderController.js';
import tryCatch from '../middleware/tryCatch.js';
const router = express.Router();

router.post('/', tryCatch(createPurchaseOrder));
router.get('/', tryCatch(getPurchaseOrders));

export default router;
