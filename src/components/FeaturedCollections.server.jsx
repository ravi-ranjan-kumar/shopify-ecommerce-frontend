import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";

const FeaturedCollections = () => {
  const {
    data: { collections },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });

  return (
    <>
      <section className="w-full h-[calc(100vh-8rem)] overflow-hidden">
        <div className="flex w-full h-full -translate-x-40">
          {collections?.nodes?.map((collection) => (
            <Image
              className="object-contain w-[100vw]"
              width={"100%"}
              height={"50%"}
              alt={`Image of ${collection?.title}`}
              data={collection?.image}
            />
          ))}
        </div>
      </section>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <div className="flex justify-between">
          <h2 className="whitespace-pre-wrap max-w-prose text-xl font-bold text-lead">
            Collections
          </h2>
          <span className="rounded-full mt-1 h-[2px] bg-gradient-to-r from-slate-300 flex-1 self-center mx-2"></span>
          <Link to="collections" className="text-blue-500 hover:underline underline-offset-2">All</Link>
        </div>
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
          {collections.nodes.map((collection) => {
            return (
              <Link
                key={collection?.id}
                to={`/collections/${collection?.handle}`}
              >
                <div className="grid gap-4">
                  {collection?.image && (
                    <Image
                      className="rounded shadow-border overflow-clip inline-block aspect-[5/4] md:aspect-[3/2] object-cover"
                      width={"100%"}
                      height={336}
                      alt={`Image of ${collection?.title}`}
                      data={collection?.image}
                    />
                  )}
                  <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                    {collection?.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FeaturedCollections;

const QUERY = gql`
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart", sortKey: UPDATED_AT) {
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
