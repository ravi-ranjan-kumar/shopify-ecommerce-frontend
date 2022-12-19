import {
  gql,
  useShopQuery,
  useRouteParams,
  Seo,
  CacheLong,
} from "@shopify/hydrogen";

import { Suspense } from "react";
import SelectFilter from "../../components/client/SelectFilter.client";
import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.server";

const filterOptions = [
  { name: "All", to: "collection_default" },
  { name: "Best Sellings", to: "best_selling" },
  { name: "Relevance", to: "relevance" },
  { name: "Latest", to: "created" },
  { name: "Price, low to high", to: "price" },
  { name: "Alphabetically, A-Z", to: "title" },
];

export default function Collection({ filter }) {
  const { handle } = useRouteParams();

  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      key: (filter && filter.toUpperCase()) || "COLLECTION_DEFAULT",
    },
    cache: CacheLong,
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>
      <header className="relative grid w-full gap-8 justify-items-start">
        <img
          src={collection?.image?.url}
          alt={collection?.image?.altText}
          className="w-full h-[calc(100vh-10rem)] object-cover"
        />
        <div className="absolute flex flex-col top-0 left-0 right-0 bottom-0 pl-14 justify-center space-y-3 border bg-gradient-to-r from-slate-400">
          <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block text-yellow-300 drop-shadow-lg">
            {collection?.title}
          </h1>
          <div className="flex items-baseline justify-between w-full text-yellow-50 drop-shadow-lg">
            <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
              {collection?.description}
            </p>
          </div>
        </div>
      </header>

      <SelectFilter filterOptions={filterOptions} />

      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {collection?.products?.nodes?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails($handle: String!, $key: ProductCollectionSortKeys!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: 8, sortKey: $key) {
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
  }
`;
