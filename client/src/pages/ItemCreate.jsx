import { useState } from "react";
import useSuppliers from "../hooks/supplierHooks";
import CustomInput from "../components/CustomInput";
import useItems from "../hooks/itemSHooks";

const ItemCreate = () => {
  const { suppliers, error: suppliersError } = useSuppliers();
  const { addItem, error: itemError, success, setSuccess } = useItems();
  const [newItem, setNewItem] = useState({
    name: "",
    location: "",
    brand: "",
    category: "",
    supplierId: "",
    stockUnit: "",
    unitPrice: "",
    status: "Enabled",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewItem((prevState) => ({
      ...prevState,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newItem).forEach((key) => {
      if (key === "images") {
        newItem.images.forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, newItem[key]);
      }
    });

    await addItem(formData);

    if (success) {
      setNewItem({
        name: "",
        location: "",
        brand: "",
        category: "",
        supplierId: "",
        stockUnit: "",
        unitPrice: "",
        status: "Enabled",
        images: [],
      });
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="xl:max-w-3xl w-full p-5 sm:p-10 rounded-md bg-slate-200">
        <h2 className="text-center text-xl sm:text-3xl font-semibold mb-5">
          Create New Item
        </h2>
        {suppliersError && <p style={{ color: "red" }}>{suppliersError}</p>}
        {itemError && <p style={{ color: "red" }}>{itemError}</p>}
        {success && (
          <p style={{ color: "green" }}>Item created successfully!</p>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <CustomInput
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleChange}
            required
          />
          <CustomInput
            type="text"
            name="location"
            placeholder="Inventory Location"
            value={newItem.location}
            onChange={handleChange}
          />
          <CustomInput
            type="text"
            name="brand"
            placeholder="Brand"
            value={newItem.brand}
            onChange={handleChange}
          />
          <CustomInput
            type="text"
            name="category"
            placeholder="Category"
            value={newItem.category}
            onChange={handleChange}
          />
          <label htmlFor="supplierId">Supplier:</label>
          <select
            name="supplierId"
            value={newItem.supplierId}
            onChange={handleChange}
            className="mb-4 w-full px-2 py-2 border rounded-md"
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
          <CustomInput
            type="text"
            name="stockUnit"
            placeholder="Stock Unit"
            value={newItem.stockUnit}
            onChange={handleChange}
          />
          <CustomInput
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={newItem.unitPrice}
            onChange={handleChange}
          />
          <div className="flex-col">
            <div>
              <label htmlFor="status">Status:</label>
              <select
                name="status"
                value={newItem.status}
                onChange={handleChange}
                className="mb-4 w-full px-2 py-2 border rounded-md"
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>

              <label htmlFor="images">Images:</label>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                multiple
                className="mb-4"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-10 py-2 bg-[#E9522C] text-white rounded-lg mt-4"
          >
            Create Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemCreate;
