import { gql, useShopQuery, useRouteParams, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";

import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.client";
import ProductDetails from "../../components/client/ProductDetails.client";

export default function Product() {
  const { handle } = useRouteParams();

  const {
    data: { product },
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      handle,
    },
  });

  const RelatedProducts = useShopQuery({
    query: RELATEDPRODUCTS_QUERY,
   
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <ProductDetails product={product} />
      <section className="px-8 py-14 grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-6 false false">
        {RelatedProducts?.data?.recomended?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </Layout>
  );
}

const RELATEDPRODUCTS_QUERY = gql`
  query relatedProducts {
    recomended: productRecommendations(
      productId: "gid://shopify/Product/6730850828344"
    ) {
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
`;

const PRODUCT_QUERY = gql`
  fragment MediaFields on Media {
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      media(first: 7) {
        nodes {
          ...MediaFields
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          compareAtPriceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
  }
`;
