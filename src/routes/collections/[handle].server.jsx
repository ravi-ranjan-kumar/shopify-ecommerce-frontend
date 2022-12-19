import {
  gql,
  useShopQuery,
  useRouteParams,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  Seo,
  Image,
} from "@shopify/hydrogen";

import { Suspense } from "react";
import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.server";

export default function Collection() {
  const { handle } = useRouteParams();

  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
  });

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>
      <header className="relative grid w-full gap-8 justify-items-start">
        <Image
          className="max-h-[calc(100vh-10rem)] object-cover"
          data={collection?.image}
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

      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {collection.products.nodes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails($handle: String!) {
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
      products(first: 8) {
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
