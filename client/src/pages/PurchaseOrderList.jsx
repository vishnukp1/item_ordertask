import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useFetchData } from "../hooks/purchaseOrderHooks";
import useItems from "../hooks/itemSHooks";
import { toast } from "react-toastify";

const PurchaseOrder = () => {
  const { suppliers, purchaseOrders } = useFetchData();
  const { items } = useItems();
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [itemTotal, setItemTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const printRef = useRef(null);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) => item.supplierId._id === supplierId)
    );
  }, [supplierId, items]);

  const handleAddItem = () => {
    setSelectedItems([
      ...selectedItems,
      {
        item: "",
        itemNo: "",
        itemName: "",
        stockUnit: "",
        unitPrice: 0,
        packingUnit: "Box",
        orderQty: 1,
        discount: 0,
      },
    ]);
  };

  const updateItemDetails = (index, field, value) => {
    const updatedItems = [...selectedItems];

    if (field === "item") {
      const selectedItem = items.find((item) => item._id === value);
      if (selectedItem) {
        updatedItems[index] = {
          ...updatedItems[index],
          item: selectedItem._id,
          itemNo: selectedItem.itemNo,
          itemName: selectedItem.name,
          stockUnit: selectedItem.stockUnit,
          unitPrice: selectedItem.unitPrice,
          packingUnit: updatedItems[index].packingUnit || "Box",
          orderQty: 1,
          discount: 0,
        };
      }
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
    }

    setSelectedItems(updatedItems);
    getTotals(updatedItems);
  };

  const getTotals = (items) => {
    let totalAmount = 0;
    let totalDiscount = 0;
    items.forEach((item) => {
      const itemAmount = item.orderQty * item.unitPrice;
      const netAmount = Math.max(itemAmount - item.discount, 0);
      totalAmount += netAmount;
      totalDiscount += item.discount;
    });
    setItemTotal(totalAmount);
    setDiscountTotal(totalDiscount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      supplierId,
      orderDate,
      items: selectedItems.map((item) => ({
        itemNo: item.itemNo,
        itemName: item.itemName,
        stockUnit: item.stockUnit,
        unitPrice: item.unitPrice,
        packingUnit: item.packingUnit,
        orderQty: item.orderQty,
        itemAmount: item.orderQty * item.unitPrice,
        discount: item.discount,
        netAmount: item.orderQty * item.unitPrice - item.discount,
      })),
      itemTotal,
      discountTotal,
      netAmount: itemTotal - discountTotal,
    };

    try {
      await axios.post("http://localhost:5000/api/purchase-orders", order);
      toast("Purchase Order Created Successfully");
    } catch (error) {
      console.error("Error creating purchase order:", error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(purchaseOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PurchaseOrders");
    XLSX.writeFile(workbook, "PurchaseOrders.xlsx");
  };

  const printContent = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(
      "<html><head><title>Print Purchase Order</title></head><body>"
    );
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Create Purchase Order
        </h2>

        <div>
          <label className="block font-semibold mb-1">Supplier</label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <h3>Items</h3>
        {selectedItems.map((selectedItem, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <select
              value={selectedItem.item}
              onChange={(e) => updateItemDetails(index, "item", e.target.value)}
              required
              className="block w-full mb-2"
            >
              <option value="">Select Item</option>
              {filteredItems.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <div className="item-row">
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                placeholder="Enter Quantity"
                value={selectedItem.orderQty}
                onChange={(e) =>
                  updateItemDetails(index, "orderQty", parseInt(e.target.value))
                }
                required
                className="block w-full mb-2 p-2 border rounded"
              />

              <label className="block mb-1 font-medium">Unit Price</label>
              <input
                type="number"
                placeholder="Enter Unit Price"
                value={selectedItem.unitPrice}
                onChange={(e) =>
                  updateItemDetails(
                    index,
                    "unitPrice",
                    parseFloat(e.target.value)
                  )
                }
                required
                className="block w-full mb-2 p-2 border rounded"
              />

              <label className="block mb-1 font-medium">Discount</label>
              <input
                type="number"
                placeholder="Enter Discount (if any)"
                value={selectedItem.discount}
                onChange={(e) =>
                  updateItemDetails(
                    index,
                    "discount",
                    parseFloat(e.target.value)
                  )
                }
                className="block w-full mb-2 p-2 border rounded"
              />
            </div>

            <span>
              Net Amount:{" "}
              {(
                selectedItem.orderQty * selectedItem.unitPrice -
                selectedItem.discount
              ).toFixed(2)}
            </span>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Item
        </button>

        <div className="mt-4">
          <strong>Total Order Amount: {itemTotal.toFixed(2)}</strong>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
        >
          Create Purchase Order
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Purchase Orders</h2>
        <div ref={printRef} className="p-4 bg-gray-100 rounded-md space-y-2">
          <ul className="space-y-2">
            {purchaseOrders.map((order) => (
              <li key={order._id} className="p-2 border rounded-md">
                <div className="font-semibold">
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div className="font-semibold">
                  Total Items: {order.items.length}
                </div>
                <div className="text-sm text-gray-600">
                  Item Total: {order.itemTotal.toFixed(2)} | Discount:{" "}
                  {order.discount.toFixed(2)} | Net Amount:{" "}
                  {order.netAmount.toFixed(2)}
                </div>
                <h3 className="mt-4 font-semibold">Item Details</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Item No</th>
                      <th className="px-4 py-2 text-left">Item Name</th>
                      <th className="px-4 py-2 text-left">Stock Unit</th>
                      <th className="px-4 py-2 text-left">Unit Price</th>
                      <th className="px-4 py-2 text-left">Packing Unit</th>
                      <th className="px-4 py-2 text-left">Order Qty</th>
                      <th className="px-4 py-2 text-left">Item Amount</th>
                      <th className="px-4 py-2 text-left">Discount</th>
                      <th className="px-4 py-2 text-left">Net Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="px-4 py-2">{item._id}</td>
                        <td className="px-4 py-2">{item.itemName}</td>
                        <td className="px-4 py-2">{item.stockUnit}</td>
                        <td className="px-4 py-2">
                          {item.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">{item.packingUnit}</td>
                        <td className="px-4 py-2">{item.orderQty}</td>
                        <td className="px-4 py-2">
                          {(item.orderQty * item.unitPrice).toFixed(2)}
                        </td>
                        <td className="px-4 py-2">
                          {item.discount.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">
                          {item.netAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={exportToExcel}
          className="flex-grow px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
        >
          Export to Excel
        </button>
        <button
          onClick={printContent}
          className="flex-grow px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md"
        >
          Print Purchase Orders
        </button>
      </div>
    </div>
  );
};

export default PurchaseOrder;
