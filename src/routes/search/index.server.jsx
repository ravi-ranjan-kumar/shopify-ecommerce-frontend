import { gql, Link, useShopQuery, useUrl } from "@shopify/hydrogen";
import React from "react";
import SelectFilter from "../../components/client/SelectFilter.client";
import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.server";

const filterOptions = [
  { name: "All", to: "id" },
  { name: "Best Sellings", to: "best_selling" },
  { name: "Relevance", to: "relevance" },
  { name: "Latest", to: "created_at" },
  { name: "Price, low to high", to: "price" },
  { name: "Alphabetically, A-Z", to: "title" },
];

const Search = ({ filter }) => {
  const { searchParams } = useUrl();

  const {
    data: { products },
  } = useShopQuery({
    query: SEARCH_QUERY,
    variables: {
      query: searchParams.get("q"),
      key: (filter && filter.toUpperCase()) || "ID",
    },
  });

  return (
    <Layout>
      {products.nodes.length !== 0 ? (
        <>
          <SelectFilter filterOptions={filterOptions} />
          <h2 className="lg:ml-12 lg:mt-10">Search Result:</h2>
          <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:pl-12">
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products?.nodes?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <ProductNotFound />
      )}
    </Layout>
  );
};

export default Search;

const SEARCH_QUERY = gql`
  query Products($query: String!, $key: ProductSortKeys!) {
    products(first: 20, sortKey: $key, query: $query) {
      nodes {
        id
        title
        handle
        variants(first: 1) {
          nodes {
            id
            image {
              url
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

function ProductNotFound() {
  return (
    <section className="mt-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-48 h-48 mx-auto text-slate-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
        />
      </svg>
      <h2 className="text-center text-4xl text-slate-600 font-semibold">
        Sorry, We coudn't find any results
      </h2>
      <Link
        to="/"
        className="block text-center mt-8 text-2xl hover:underline underline-offset-4 text-blue-400 hover:text-blue-500 mx-auto font-semibold transition-all"
      >
        Go Back
      </Link>
    </section>
  );
}
