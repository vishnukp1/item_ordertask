import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  brand: String,
  category: String,
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  stockUnit: String,
  unitPrice: Number,
  status: { type: String, default: "Enabled" },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
