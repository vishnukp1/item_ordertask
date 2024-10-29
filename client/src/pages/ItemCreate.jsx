import { useState } from "react";
import useSuppliers from "../hooks/supplierHooks";
import CustomInput from "../components/CustomInput";
import useItems from "../hooks/itemSHooks";

const ItemCreate = () => {
  const { suppliers, error: suppliersError } = useSuppliers();
  const { items, addItem, error: itemError, success, setSuccess } = useItems();
  const [newItem, setNewItem] = useState({
    name: "",
    location: "",
    brand: "",
    category: "",
    supplierId: "",
    stockUnit: "",
    unitPrice: "",
    status: "Enabled",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(newItem);

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
          <label>Supplier:</label>
          <select
            name="supplierId"
            value={newItem.supplierId}
            onChange={handleChange}
            required
            className="px-4 py-2 mb-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-600"
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
              <label>Status:</label>
              <select
                name="status"
                value={newItem.status}
                onChange={handleChange}
                className="px-4 py-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-600"
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-10 py-2 bg-[#E9522C] text-white rounded-lg mt-4"
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemCreate;
