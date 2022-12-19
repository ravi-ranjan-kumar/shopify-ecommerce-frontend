import { useServerProps } from "@shopify/hydrogen";
import React, { useState } from "react";
import Form from "./Form.client";

const initialAddress = {
  address1: "",
  address2: "",
  city: "",
  company: "",
  country: "",
  firstName: "",
  lastName: "",
  phone: "",
  province: "",
  zip: "",
};

const AddAddressForm = ({ setIsOpen }) => {
  const { setServerProps } = useServerProps();
  const [formData, setFormData] = useState(initialAddress);
  const [formError, setFormError] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await callAddAddressApi(formData);
    if (response?.status) {
      setServerProps("search", Date.now());
      setIsOpen(false);
      return;
    }
    setFormError(response);
  };

  return (
    <Form
      formError={formError}
      formData={formData}
      setIsOpen={setIsOpen}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default AddAddressForm;

export async function callAddAddressApi(credentials) {
  try {
    const res = await fetch(`/account/addaddress`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      return { status: true };
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
