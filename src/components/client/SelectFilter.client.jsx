import { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Link, useRouteParams, useServerProps } from "@shopify/hydrogen";

export const filterOptions = [
  { name: "Best Sellings", to: "best_selling" },
  { name: "Relevance", to: "relevance" },
  { name: "Latest", to: "created_at" },
  { name: "Price, low to high", to: "price" },
  { name: "Alphabetically, A-Z", to: "title" },
];

export default function SelectFilter() {
  const { setServerProps } = useServerProps();

  return (
    <div className="w-11/12 mx-auto mt-4">
      <select
        className="rounded py-1 px-2 outline outline-1 outline-gray-300"
        onChange={(e) => setServerProps("search", (e.target.value).toUpperCase())}
      >
        <option value="" className="text-center">
          --Filter Products--
        </option>
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
