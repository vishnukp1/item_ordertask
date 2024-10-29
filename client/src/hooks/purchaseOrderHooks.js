import { useEffect, useState } from "react";
import { Axios } from "../api/Axois";

export const useFetchData = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [purchaseOrdersRes, suppliersRes, itemsRes] = await Promise.all([
        Axios.get("/api/purchase-orders"),
        Axios.get("/api/suppliers"),
        Axios.get("/api/items"),
      ]);
      setPurchaseOrders(purchaseOrdersRes.data.data);
      setSuppliers(suppliersRes.data.data);
      setItems(itemsRes.data.data);
    };

    fetchData();
  }, []);

  return { purchaseOrders, suppliers, items };
};
