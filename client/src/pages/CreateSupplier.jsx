import { useRef } from 'react';
import useSuppliers from '../hooks/supplierHooks';
import CustomInput from '../components/CustomInput';

const CreateSupplier = () => {
  const {SupplierList, loading, error, addSupplier } = useSuppliers();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const newSupplier = {
        name: formData.get('name'),
        address: formData.get('address'),
        taxNo: formData.get('taxNo'),
        country: formData.get('country'),
        mobile: formData.get('mobile'),
        email: formData.get('email'),
        status: 'Active',
      };
      await addSupplier(newSupplier);

      formRef.current.reset(); 
    }
  };

  return (
    <div className=' w-full p-5 sm:p-10 rounded-md '>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {SupplierList?.map((supplier) => (
          <li key={supplier._id}>
            {supplier.name} - {supplier.status}
          </li>
        ))}
      </ul>
      
    <div className="flex items-center justify-center  w-full">
      <div className='bg-slate-200 xl:max-w-3xl w-full p-5 sm:p-10 rounded-md'>
      <h3 className='text-center text-xl sm:text-3xl font-semibold items-center mb-5'>Add Supplier</h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        <CustomInput type="text" name="name" placeholder="Name" />
        <CustomInput type="text" name="address" placeholder="Address" />
        <CustomInput type="text" name="taxNo" placeholder="TAX No" />
        <CustomInput type="text" name="country" placeholder="Country" />
        <CustomInput type="text" name="mobile" placeholder="Mobile" />
        <CustomInput type="email" name="email" placeholder="Email" />
        <button
          type="submit"
          className="px-4 py-2 mt-4 bg-[#E9522C] text-white rounded-lg hover:bg-[#d94724] transition-all duration-300 ease-in-out"
        >
          Add Supplier
        </button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default CreateSupplier;
