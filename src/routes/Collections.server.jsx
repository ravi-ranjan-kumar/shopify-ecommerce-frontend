import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import Layout from "../components/Layout.server";

export default function AllCollections() {
  const {
    data: { collections },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });

  return (
    <Layout>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <h1 className="text-4xl font-bold mx-auto capitalize my-4 underline underline-offset-8 decoration-violet-900 cursor-pointer">
          All Collections
        </h1>
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
          {collections.nodes.map((collection) => {
            return (
              <Link
                key={collection.id}
                to={`/collections/${collection.handle}`}
              >
                <div className="grid gap-4">
                  {collection?.image ? (
                    <Image
                      className="rounded shadow-border overflow-clip inline-block aspect-[5/4] md:aspect-[3/2] object-cover"
                      width={"100%"}
                      height={336}
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                    />
                  ) : (
                    <img
                      src="https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"
                      alt={collection.title}
                      className="rounded shadow-border overflow-clip inline-block aspect-[5/4] md:aspect-[3/2] object-cover border"
                    />
                  )}
                  <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                    {collection.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

const QUERY = gql`
  query Collections {
    collections(first: 20) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
