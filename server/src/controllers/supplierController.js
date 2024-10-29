import Supplier from "../models/supplierSchema.js";

export const createSupplier = async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).json({
    status: "success",
    message: "created supplier Successfully",
    data: supplier,
  });
};

export const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.status(200).json({
    status: "success",
    message: "Got supplier details Successfully",
    data: suppliers,
  });
};
