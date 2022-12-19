import { useState } from "react";
import UpdateCustomerForm from "./UpdateCustomerForm.client";

const CustomerDetailsCard = ({ customer }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <>
      {isOpen && <UpdateCustomerForm setIsOpen={setIsOpen} />}
      <section className="w-11/12 mx-auto flex justify-between">
        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold underline underline-offset-4">
              Personal Information
            </h3>
            <button onClick={()=> setIsOpen(true)}>Update</button>
          </div>
          <div className="">
            <p className="font-medium">First Name</p>
            <p>{customer?.firstName}</p>
          </div>
          <div className="">
            <p className="font-medium">Last Name</p>
            <p>{customer?.lastName}</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p>{customer?.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone Number</p>
            <p>{customer.phone}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerDetailsCard;

