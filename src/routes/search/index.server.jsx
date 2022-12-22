import { gql, Link, useShopQuery, useUrl } from "@shopify/hydrogen";
import LoadMore from "../../components/client/LoadMore.client";
import SelectFilter from "../../components/client/SelectFilter.client";
import Layout from "../../components/Layout.server";

const filterOptions = [
  { name: "All", to: "id" },
  { name: "Best Sellings", to: "best_selling" },
  { name: "Relevance", to: "relevance" },
  { name: "Latest", to: "created_at" },
  { name: "Price, low to high", to: "price" },
  { name: "Alphabetically, A-Z", to: "title" },
];

let globalSearchQuery,
  INITIAL_PAGINATION_SIZE = 5;

const Search = ({ filter }) => {
  let products,
    url = useUrl();

  globalSearchQuery = url.searchParams.get("q");

  const { data } = useShopQuery({
    query: SEARCH_QUERY,
    variables: {
      query: globalSearchQuery,
      key: (filter && filter.toUpperCase()) || "ID",
      pageBy: INITIAL_PAGINATION_SIZE,
    },
    preload: true,
  });

  products = data?.products;

  return (
    <Layout>
      {products.nodes.length !== 0 ? (
        <>
          <SelectFilter filterOptions={filterOptions} />
          <h2 className="lg:ml-12 lg:mt-6 text-sm">
            Search Result:{" "}
            <span className="font-bold">{globalSearchQuery}</span>
          </h2>
          <LoadMore products={products} url={url.pathname} filter={filter} />
        </>
      ) : (
        <ProductNotFound />
      )}
    </Layout>
  );
};

export default Search;

const SEARCH_QUERY = gql`
  query Products(
    $query: String!
    $key: ProductSortKeys!
    $pageBy: Int!
    $cursor: String
  ) {
    products(first: $pageBy, after: $cursor, sortKey: $key, query: $query) {
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

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }
  const searchBy = await request.json();

  const { data } = await queryShop({
    query: SEARCH_QUERY,
    variables: {
      query: globalSearchQuery,
      key: searchBy?.filterBy?.toUpperCase() || "ID",
      pageBy: searchBy.pageBy || INITIAL_PAGINATION_SIZE,
      cursor: searchBy.cursor || null,
    },
    preload: true,
  });

  return data?.products;
}
