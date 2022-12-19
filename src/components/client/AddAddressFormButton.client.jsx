import { useState } from "react";
import AddAddressForm from "./AddAddressForm.client";

const AddAddressFormButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <AddAddressForm setIsOpen={setIsOpen} />}
      <button
        className="text-yellow-50 text-base mt-4 bg-slate-500 shadow-lg hover:bg-slate-600 hover:shadow-md py-1 px-3 rounded-full"
        onClick={() => setIsOpen(true)}
      >
        Add Address
      </button>
    </>
  );
};

export default AddAddressFormButton;
