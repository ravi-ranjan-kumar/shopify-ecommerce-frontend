import { useServerProps } from "@shopify/hydrogen";
import React, { useState } from "react";
import Form from "./Form.client";

const UpdateAddress = ({ address, setIsOpen }) => {
  delete address["id"];
  const { setServerProps } = useServerProps();
  const [formData, setFormData] = useState(address);
  const [formError, setFormError] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await callAddressChangeApi(formData);
    if (response?.status) {
      setIsOpen(false);
      setServerProps("search", Date.now());
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

export default UpdateAddress;

export async function callAddressChangeApi(credentials) {
  try {
    const res = await fetch(`/account/updateaddress`, {
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
