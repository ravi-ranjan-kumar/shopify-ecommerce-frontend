import { useServerProps } from "@shopify/hydrogen";
import React, { useState } from "react";
import UpdateAddress from "./UpdateAddress.client";

const UserAddress = ({ address }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setServerProps } = useServerProps();

  const deleteAddress = async () => {
    const response = await callDeleteAddressApi(address?.id);
    if (response?.isDeleted) {
      setIsOpen(false);
      setServerProps("search", Date.now());
      return;
    }
  };

  return (
    <>
      {isOpen && <UpdateAddress address={address} setIsOpen={setIsOpen} />}
      <button
        className="text-yellow-50 text-base mt-4 bg-slate-500 shadow-lg hover:bg-slate-600 hover:shadow-md py-1 px-3 rounded-full"
        onClick={() => setIsOpen(true)}
      >
        Edit Address
      </button>
      {address && (
        <div className="flex justify-between border rounded shadow-xl mt-4 px-3 w-56">
          <address className="flex-1 py-2">
            {address?.address1}
            <br />
            {address?.address2}
            <br />
            {address?.city}
            <br />
            {address?.country}
            <br />
            {address?.province}
            <br />
            {address?.zip}
            <br />
            
          </address>
          <div>
            <button onClick={deleteAddress}>x</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAddress;

export async function callDeleteAddressApi(addressId) {
  try {
    const res = await fetch(`/account/deleteaddressapi/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressId),
    });

    if (res.ok) {
      return { isDeleted: true };
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
