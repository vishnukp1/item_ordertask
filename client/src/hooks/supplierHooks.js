import { useState, useEffect } from "react";
import { Axios } from "../api/Axois";
import { toast } from "react-toastify";

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.get("/api/suppliers");
      if (response.data.data && Array.isArray(response.data.data)) {
        setSuppliers(response.data.data);
      } else {
        console.warn("No data returned from the server or invalid data format");
      }
    } catch (err) {
      console.error("Error fetching suppliers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSupplier = async (newSupplier) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.post("/api/suppliers", newSupplier);
      if (response.data.data) {
        setSuppliers((prevSuppliers) => [...prevSuppliers, response.data]);
        if (response.status === 201) {
          toast("created supplier successfully");
        }
      } else {
        console.warn("No data returned when adding supplier");
      }
    } catch (err) {
      console.error("Error adding supplier:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return { suppliers, loading, error, fetchSuppliers, addSupplier };
};

export default useSuppliers;
