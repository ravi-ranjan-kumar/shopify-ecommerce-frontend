import { gql, useShopQuery, useUrl } from "@shopify/hydrogen";
import Layout from "../../components/Layout.server";
import SelectFilter from "../../components/client/SelectFilter.client";
import LoadMore from "../../components/client/LoadMore.client";

const filterOptions = [
  { name: "All", to: "id" },
  { name: "Best Sellings", to: "best_selling" },
  { name: "Relevance", to: "relevance" },
  { name: "Latest", to: "created_at" },
  { name: "Price, low to high", to: "price" },
  { name: "Alphabetically, A-Z", to: "title" },
];

let INITIAL_PAGINATION_SIZE = 4;

const AllProduct = ({ filter }) => {
  let products,
    url = useUrl();

  const { data } = useShopQuery({
    query: QUERY,
    variables: {
      key: (filter && filter.toUpperCase()) || "ID",
      pageBy: INITIAL_PAGINATION_SIZE,
    },
    preload: true,
  });

  products = data.products;

  return (
    <Layout>
      <SelectFilter filterOptions={filterOptions} />
      <LoadMore products={products} url={url.pathname} filter={filter} />
    </Layout>
  );
};

export default AllProduct;

const QUERY = gql`
  query Products($key: ProductSortKeys!, $pageBy: Int!, $cursor: String) {
    products(
      first: $pageBy
      after: $cursor
      query: "collection_type:smart"
      sortKey: $key
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
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

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }

  const searchBy = await request.json();

  const { data } = await queryShop({
    query: QUERY,
    variables: {
      key: searchBy?.filterBy?.toUpperCase() || "ID",
      pageBy: searchBy.pageBy || 4,
      cursor: searchBy.cursor || null,
    },
    preload: true,
  });

  return data?.products;
}
