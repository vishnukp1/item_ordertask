import Item from "../models/itemSchema.js";

export const createItem = async (req, res) => {

    const {
      name,
      location,
      brand,
      category,
      supplierId,
      stockUnit,
      unitPrice,
      status,
    } = req.body;
   
    const imagePaths = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];


    const newItem = {
      name,
      location,
      brand,
      category,
      supplierId,
      stockUnit,
      unitPrice,
      status,
      images: imagePaths,
    };

    const item = await Item.create(newItem);
    res.status(201).json({
      status: "success",
      message: "Item created successfully",
      data: item,
    });
  } 


export const getItems = async (req, res) => {
  const items = await Item.find().populate("supplierId");
  res.status(200).json({
    status: "success",
    message: "Items got Successfully",
    data: items,
  });
};
