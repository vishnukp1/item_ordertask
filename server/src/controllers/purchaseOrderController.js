import PurchaseOrder from "../models/purchaseOrderSchema.js";

export const createPurchaseOrder = async (req, res) => {
  const { supplier} = req.body;


  const purchaseOrder = await PurchaseOrder.create({
    supplier
  });

  res.status(201).json({
    status: "success",
    message: "purchase ordered created Successfully",
    data: purchaseOrder,
  });
};

export const getPurchaseOrders = async (req, res) => {
  const orders = await PurchaseOrder.find().populate("supplier");

  res.status(200).json({
    status: "success",
    message: "order got Successfully",
    data: orders,
  });
};
