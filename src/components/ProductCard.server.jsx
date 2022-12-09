import { Link, Image, Money } from "@shopify/hydrogen";

export default function ProductCard({ product }) {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`/products/${product.handle}`}>
        <div className="grid gap-6">
          <div className="shadow-sm rounded relative overflow-hidden">
            {isDiscounted && (
              <label className="subpixel-antialiased z-10 absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs">
                Sale
              </label>
            )}
            <Image
              className="aspect-[4/5] hover:scale-110 z-0 transition-all duration-300"
              data={product.variants.nodes[0].image}
              alt="Alt Tag"
            />
          </div>
          <div className="grid gap-1">
            <h3 className="max-w-prose font-medium text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis ">
              {product.title}
            </h3>
            <div className="flex gap-4">
              <span className="max-w-prose font-bold text-slate-800 whitespace-pre-wrap inherit text-copy flex gap-4">
                <Money withoutTrailingZeros data={price} />
                {isDiscounted && (
                  <Money
                    className="line-through opacity-50"
                    withoutTrailingZeros
                    data={compareAtPrice}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>
  );
}
