import { useNavigate } from "react-router-dom";
import useSuppliers from "../hooks/supplierHooks";

const SuppliersList = () => {
  const { suppliers } = useSuppliers();
  const navigate = useNavigate();

  return (
    <div className="px-6">
      <div className="flex justify-end">
      <button
        onClick={() => navigate("/createsupplier")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
      >
        Add Supplier
      </button>
      </div>
      <h2 className="text-center text-xl sm:text-3xl font-semibold mb-4">
      Suppliers List
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">Supplier Name</th>

              <th className="py-2 px-4 text-left">Tax No</th>
              <th className="py-2 px-4 text-left">Country</th>
              <th className="py-2 px-4 text-left">Mobile</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {suppliers?.map((supplier) => (
              <tr key={supplier._id} className="border-t border-gray-200">
                <td className="py-2 px-4">{supplier.name}</td>

                <td className="py-2 px-4">{supplier.taxNo || "N/A"}</td>
                <td className="py-2 px-4">{supplier.country || "N/A"}</td>
                <td className="py-2 px-4">{supplier.mobile || "N/A"}</td>
                <td className="py-2 px-4">{supplier.email}</td>
                <td className="py-2 px-4">{supplier.address || "N/A"}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      supplier.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {supplier.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuppliersList;
