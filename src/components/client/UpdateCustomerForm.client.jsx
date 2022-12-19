import { useServerProps } from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const UpdateCustomerForm = ({ setIsOpen }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState();
  const { setServerProps } = useServerProps();
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await updateCustomerDetailsApi(formData);
    if (res?.isUpdated) {
      setIsOpen(false);
      setServerProps("search", Date.now());
      return;
    }
    setFormError(res);
  };
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center border backdrop-blur-md">
      <form
        onSubmit={handleFormSubmit}
        ref={menuRef}
        className="w-1/2 mx-auto bg-white dark:bg-gray-800 capitalize space-y-3 p-8 rounded shadow-md"
      >
        <p className="text-red-500 text-sm m-2">{formError?.error}</p>
        <div className="flex flex-col">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            className="border rounded-sm p-1 text-base outline-none"
            value={formData?.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            value={formData?.lastName}
            className="border rounded-sm p-1 text-base outline-none"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={formData?.email}
            className="border rounded-sm p-1 text-base outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Phone Number</label>
          <input
            type="text"
            value={formData?.phone}
            className="border rounded-sm p-1 text-base outline-none"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div className="container mx-auto w-11/12 xl:w-full">
          <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4"
            >
              Cancel
            </button>
            <button
              className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UpdateCustomerForm;

async function updateCustomerDetailsApi(customerInformation) {
  try {
    const res = await fetch(`/account/updatecustomer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerInformation),
    });

    if (res.ok) {
      return { isUpdated: true };
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
