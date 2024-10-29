import PurchaseOrder from "../models/purchaseOrderSchema.js";

export const createPurchaseOrder = async (req, res) => {
  const { supplier, items } = req.body;

  let itemTotal = 0;
  let discountTotal = 0;

  items.forEach((item) => {
    itemTotal += item.unitPrice * 2;
    discountTotal += item.discount || 0;
  });

  const netAmount = itemTotal - discountTotal;

  const purchaseOrder = await PurchaseOrder.create({
    supplier,
    items,
    itemTotal,
    discount: discountTotal,
    netAmount,
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
