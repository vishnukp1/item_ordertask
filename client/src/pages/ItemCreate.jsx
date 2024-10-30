import { useRef } from "react";
import useSuppliers from "../hooks/supplierHooks";
import CustomInput from "../components/CustomInput";
import useItems from "../hooks/itemSHooks";

const ItemCreate = () => {
  const { suppliers, error: suppliersError } = useSuppliers();
  const { addItem, error: itemError, success, setSuccess } = useItems();

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = {
      name: formRef.current.name.value,
      location: formRef.current.location.value,
      brand: formRef.current.brand.value,
      category: formRef.current.category.value,
      supplierId: formRef.current.supplierId.value,
      stockUnit: formRef.current.stockUnit.value,
      unitPrice: formRef.current.unitPrice.value,
      status: formRef.current.status.value,
      imagePath: formRef.current.images.files[0], 
    };

    await addItem(item);

    if (success) {
     
      formRef.current.reset(); 
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

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <CustomInput
            type="text"
            name="name"
            placeholder="Item Name"
            required
          />
          <CustomInput
            type="text"
            name="location"
            placeholder="Inventory Location"
          />
          <CustomInput
            type="text"
            name="brand"
            placeholder="Brand"
          />
          <CustomInput
            type="text"
            name="category"
            placeholder="Category"
          />
          <label htmlFor="supplierId">Supplier:</label>
          <select
            name="supplierId"
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
          />
          <CustomInput
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
          />
          <div className="flex-col">
            <div>
              <label htmlFor="status">Status:</label>
              <select
                name="status"
                className="mb-4 w-full px-2 py-2 border rounded-md"
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>

              <label htmlFor="images">Images:</label>
              <input
                type="file"
                name="images"
                className="mb-4"
                multiple 
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
