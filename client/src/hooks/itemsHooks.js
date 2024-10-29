import { useEffect, useState } from 'react';
import { Axios } from '../api/Axois';
import { toast } from 'react-toastify';

const useItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const addItem = async (newItem) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const response = await Axios.post('/api/items', newItem);
      if (response.status === 201) {
        setItems(prevItems => [...prevItems, response.data.data]);
        setSuccess(true);
        toast("item created successfully")
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await Axios.get('/api/items');
      setItems(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, addItem, error, success, setSuccess, loading, fetchItems };
};

export default useItems;
