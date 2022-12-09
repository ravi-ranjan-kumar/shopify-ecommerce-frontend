import { CacheLong, gql, Image, Link, useShopQuery } from "@shopify/hydrogen";
import React from "react";
import ProductCard from "./ProductCard.server";

const BestSelling = () => {
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });

  return (
    <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
      <div className="flex justify-between">
        <h2 className="whitespace-pre-wrap max-w-prose text-xl font-bold text-lead">
          Best Selling
        </h2>
        <span className="rounded-full mt-1 h-[2px] bg-gradient-to-r from-slate-300 flex-1 self-center mx-2"></span>
        <Link to="products" className="text-blue-500 hover:underline underline-offset-2">All</Link>
      </div>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-6 false false">
        {products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSelling;

const QUERY = gql`
  query BestSelling {
    products(first: 6, query: "collection_type:smart", sortKey: BEST_SELLING) {
      nodes {
        id
        title
        publishedAt
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
