import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './src/db/db.js';
import supplierRoutes from './src/routes/supplierRoutes.js';
import itemRoutes from './src/routes/itemRoutes.js';
import purchaseOrderRoutes from './src/routes/purchaseOrderRoutes.js';

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/suppliers', supplierRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
