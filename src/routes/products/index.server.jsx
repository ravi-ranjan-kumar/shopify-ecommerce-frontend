import { CacheLong, gql, Link, useRouteParams, useShopQuery } from "@shopify/hydrogen";
import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.server";
import SelectFilter from "../../components/SelectFilter.client";

const AllProducts = () => {
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong,
  });

  return (
    <Layout>
      <SelectFilter />
      <section className="w-full z-0 gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.nodes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AllProducts;

const QUERY = gql`
  query Products {
    products(first: 20) {
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
