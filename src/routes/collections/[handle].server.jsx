import {
  gql,
  useShopQuery,
  useRouteParams,
  Seo,
  CacheLong,
  useUrl,
} from "@shopify/hydrogen";

import { Suspense } from "react";
import LoadMore from "../../components/client/LoadMore.client";
import SelectFilter from "../../components/client/SelectFilter.client";
import Layout from "../../components/Layout.server";

const filterOptions = [
  { name: "All", to: "collection_default" },
  { name: "Best Sellings", to: "best_selling" },
  { name: "Relevance", to: "relevance" },
  { name: "Latest", to: "created" },
  { name: "Price, low to high", to: "price" },
  { name: "Alphabetically, A-Z", to: "title" },
];

const INITIAL_PAGINATION_SIZE = 4;
let globalHandle;

export default function Collection({ filter }) {
  let { handle } = useRouteParams(),
    url = useUrl();
  globalHandle = handle;

  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      pageBy: INITIAL_PAGINATION_SIZE,
      key: "COLLECTION_DEFAULT",
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

      <LoadMore
        products={collection?.products}
        url={url.pathname}
        filter={filter}
      />
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $key: ProductCollectionSortKeys!
    $pageBy: Int!
    $cursor: String
  ) {
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
      products(first: $pageBy, after: $cursor, sortKey: $key) {
        pageInfo {
          hasNextPage
          endCursor
        }
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

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }

  const searchBy = await request.json();

  const { data } = await queryShop({
    query: QUERY,
    variables: {
      handle: globalHandle,
      key: searchBy?.filterBy?.toUpperCase() || "COLLECTION_DEFAULT",
      pageBy: searchBy.pageBy || 4,
      cursor: searchBy.cursor || null,
    },
    preload: true,
  });

  return data?.collection?.products;
}
