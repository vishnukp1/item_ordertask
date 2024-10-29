import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  taxNo: String,
  country: String,
  mobile: String,
  email: { type: String, required: true },
  status: { type: String, default: "Active" },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
