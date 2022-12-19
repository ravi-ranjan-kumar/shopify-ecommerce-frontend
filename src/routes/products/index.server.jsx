import { CacheLong, gql, useShopQuery, useUrl } from "@shopify/hydrogen";
import React from "react";
import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.server";
import SelectFilter from "../../components/client/SelectFilter.client";

const filterOptions = [
  { name: "All", to: "id" },
  { name: "Best Sellings", to: "best_selling" },
  { name: "Relevance", to: "relevance" },
  { name: "Latest", to: "created_at" },
  { name: "Price, low to high", to: "price" },
  { name: "Alphabetically, A-Z", to: "title" },
];

const AllProduct = ({ filter }) => {
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
    variables: {
      key: (filter && filter.toUpperCase()) || "ID",
    },
    cache: CacheLong,
  });

  return (
    <Layout>
      <SelectFilter filterOptions={filterOptions} />
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.nodes?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AllProduct;

const QUERY = gql`
  query Products($key: ProductSortKeys!) {
    products(first: 20, query: "collection_type:smart", sortKey: $key) {
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
