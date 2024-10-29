const CustomInput = ({ type, name, placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent mb-2 placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${className}`}
      {...props}
    />
  );
};

export default CustomInput;
