import mongoose from "mongoose";

const purchaseOrderSchema = new mongoose.Schema({
  orderNo: { type: String, required: false },
  orderDate: { type: Date, default: Date.now },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      itemName:String,
      quantity: Number,
      packingUnit: String,
      stockUnit:String,
      unitPrice: Number,
      orderQty:Number,
      discount: Number,
      netAmount: Number,
    },
  ],
  itemTotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  netAmount: { type: Number, default: 0 },
});

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;
