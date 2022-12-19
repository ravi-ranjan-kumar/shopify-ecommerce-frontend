import React, { useEffect, useRef } from "react";

const Form = ({
  formData,
  setFormData,
  handleFormSubmit,
  formError,
  setIsOpen,
}) => {
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

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center backdrop-blur-md overflow-scroll">
      <form
        className="w-11/12 mx-auto my-2 bg-white dark:bg-gray-800 capitalize rounded shadow-md"
        onSubmit={handleFormSubmit}
        ref={menuRef}
      >
        <h2 className="text-center py-4 text-xl font-bold">
          Enter your Address Carefully
        </h2>
        <p className="text-red-500 text-sm m-2">{formError?.error}</p>
        <div className="container mx-auto px-4 pt-4">
          <div className="container gap-x-8 mx-auto grid md:grid-cols-2">
            <div className="flex flex-col mb-6">
              <label
                htmlFor="Address1"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                Address1
              </label>
              <input
                className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm outline-none rounded bg-transparent text-sm placeholder-gray-500 text-gray-500 dark:text-gray-400"
                type="text"
                id="Address1"
                name="Address1"
                value={formData?.address1}
                required
                onChange={(e) => {
                  setFormData({ ...formData, address1: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="Address2"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                Address2
              </label>
              <input
                className="pl-3 py-3 w-full border border-gray-300 text-sm outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400"
                type="text"
                id="Address2"
                name="Address2"
                value={formData?.address2}
                required
                onChange={(e) => {
                  setFormData({ ...formData, address2: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="Phone"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                Phone
              </label>
              <input
                className="pl-3 py-3 w-full border border-gray-300 text-sm outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400"
                type="tel"
                id="Phone"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                maxLength="12"
                title="Ten digits code"
                name="number"
                value={formData?.phone}
                required
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="City"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                City
              </label>
              <input
                className="pl-3 py-3 w-full text-sm focus:outline-none border border-gray-300 bg-transparent rounded placeholder-gray-500 text-gray-500 dark:text-gray-400"
                type="text"
                id="City"
                name="city"
                value={formData?.city}
                required
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="State/Province"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                State/Province
              </label>
              <input
                className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm outline-none bg-transparent rounded text-sm placeholder-gray-500 text-gray-500 dark:text-gray-400"
                type="text"
                id="State/Province"
                name="state"
                value={formData?.province}
                required
                onChange={(e) => {
                  setFormData({ ...formData, province: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="Country"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                Country
              </label>
              <input
                className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-gray-400"
                type="text"
                id="Country"
                name="country"
                value={formData?.country}
                required
                onChange={(e) => {
                  setFormData({ ...formData, country: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="ZIP"
                className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
              >
                ZIP/Postal Code
              </label>
              <input
                className="bg-transparent border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none placeholder-gray-500 text-gray-500 dark:text-gray-400"
                type="text"
                name="zip"
                id="ZIP"
                value={formData?.zip}
                required
                onChange={(e) => {
                  setFormData({ ...formData, zip: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto w-11/12 ">
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

export default Form;
