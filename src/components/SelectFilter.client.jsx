import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Link, useRouteParams } from "@shopify/hydrogen";

export const filterOptions = [
  { name: "Best Sellings", to: "products/filter/best_selling" },
  { name: "Relevance", to: "products/filter/relevance" },
  { name: "Latest", to: "products/filter/created_at" },
  { name: "Price, low to high", to: "products/filter/price" },
  { name: "Alphabetically, A-Z", to: "products/filter/title" },
];

export default function SelectFilter() {
  const { handle } = useRouteParams();
  const value = filterOptions.find(filter => filter.to.includes(handle));

  return (
    <div className="w-72 my-4 mx-14 border">
      <Listbox value={filterOptions[0]}>
        <div className="relative mt-1">
          <Listbox.Button data-headlessui-state aria-expanded= 'false' className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate capitalize">
              {handle ? value.name : "Filter"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filterOptions.map((filterOption, index) => (
                <Listbox.Option
                  key={index}
                  className= 'relative cursor-default text-gray-900 select-none hover:bg-amber-100 hover:text-amber-900'
                >
                  <Link to={filterOption.to} className="block py-2 pl-10 pr-4">
                    <span className={`block truncate`}>{filterOption.name}</span>
                  </Link>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
