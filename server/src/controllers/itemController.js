import Item from "../models/itemSchema.js";

export const createItem = async (req, res) => {
  console.log("body", req.body);
  const item = await Item.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Item created Successfully",
    data: item,
  });
};

export const getItems = async (req, res) => {
  const items = await Item.find().populate("supplierId");
  res.status(200).json({
    status: "success",
    message: "Items got Successfully",
    data: items,
  });
};
