import { useServerProps } from "@shopify/hydrogen";
import { useState } from "react";

export default function SelectFilter({ filterOptions }) {
  const { setServerProps } = useServerProps();

  const handleChange = (e) => {
    setServerProps("filter", e.target.value );
  };

  return (
    <div className="w-11/12 mx-auto mt-4">
      <select
        name="type"
        className="rounded py-1 px-2 outline outline-1 outline-gray-300"
        onChange={handleChange}
      >
        {filterOptions?.map((item) => (
          <option
            key={item.name}
            value={item.to}
            className="outline outline-1 outline-gray-300 rounded p-4 m-4 text-slate-700"
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
