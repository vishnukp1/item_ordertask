import { useNavigate } from "react-router-dom";
import useItems from "../hooks/itemSHooks";

const ItemList = () => {
  const navigate = useNavigate();
  const { items, loading, error } = useItems();

  return (
    <div className="px-6">
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/createitem")}
          className="px-10 py-2 bg-blue-600 text-white rounded-lg mt-4"
        >
          Create Item
        </button>
      </div>
      <h2 className="text-center text-xl sm:text-3xl font-semibold mb-4">
        Items
      </h2>

      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p className="text-red-600">Error loading items: {error}</p>
      ) : items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">Item No</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Brand</th>
                <th className="py-2 px-4 text-left">Supplier</th>
                <th className="py-2 px-4 text-left">Unit Price</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.category || "N/A"}</td>
                  <td className="py-2 px-4">{item.brand || "N/A"}</td>
                  <td className="py-2 px-4">
                    {item.supplierId?.name || "N/A"}
                  </td>
                  <td className="py-2 px-4">${item.unitPrice}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Enabled"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemList;
