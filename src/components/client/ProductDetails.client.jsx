import {
  ProductOptionsProvider,
  MediaFile,
  useProductOptions,
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
} from "@shopify/hydrogen";
import { useRef } from "react";

const ProductDetails = ({ product }) => {
  return (
    <>
      <ProductOptionsProvider data={product}>
        <section className="w-full overflow-x-hidden gap-4 md:gap-8 grid px-6 md:px-8 lg:px-16">
          <div className="grid items-start gap-6 lg:gap-10 md:grid-cols-2">
            <div className="grid md:grid-flow-row mx-auto md:p-0 md:overflow-x-auto md:grid-cols-2 md:w-full">
              <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw] shadow rounded">
                <ProductGallery media={product.media.nodes} />
              </div>
            </div>
            <div className="lg:pl-14 lg:pr-24 mx-auto mt-8">
              <div className="grid gap-2">
                <h1 className="text-4xl font-bold leading-10 whitespace-normal">
                  {product.title}
                </h1>
                <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
                  {product.vendor}
                </span>
              </div>
              <ProductForm product={product} />
              <div className="mt-8">
                <div
                  className="prose border-t border-gray-200 text-black text-md"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </ProductOptionsProvider>
    </>
  );
};
export default ProductDetails;

function ProductForm({ product }) {
  const { options, selectedVariant } = useProductOptions();

  const isOutOfStock = !selectedVariant?.availableForSale || false;
  return (
    <form className="grid gap-10">
      {
        <div className="grid gap-4">
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div
                key={name}
                className="flex flex-wrap items-baseline justify-start gap-6"
              >
                <legend className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
                  {name}
                </legend>
                <div className="flex flex-wrap items-baseline gap-4">
                  <OptionRadio name={name} values={values} />
                </div>
              </div>
            );
          })}
        </div>
      }
      <div>
        <ProductPrice
          className="text-gray-500 line-through text-lg font-semibold"
          priceType="compareAt"
          variantId={selectedVariant.id}
          data={product}
        />
        <ProductPrice
          className="text-gray-900 text-lg font-semibold"
          variantId={selectedVariant.id}
          data={product}
        />
      </div>
      <div className="grid items-stretch gap-4">
        <AddToCartButton
          type="button"
          variantId={selectedVariant.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={isOutOfStock}
        >
          <span className="bg-black text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full">
            {isOutOfStock ? "Sold out" : "Add to cart"}
          </span>
        </AddToCartButton>
        {isOutOfStock ? (
          <span className="text-black text-center py-3 px-6 border rounded-sm leading-none ">
            Available in 2-3 weeks
          </span>
        ) : (
          <BuyNowButton variantId={selectedVariant.id}>
            <span className="bg-blue-500 hover:bg-blue-700 transition-all text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full border">
              Buy it now
            </span>
          </BuyNowButton>
        )}
      </div>
    </form>
  );
}

function OptionRadio({ values, name }) {
  const { selectedOptions, setSelectedOption } = useProductOptions();

  return (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;

        return (
          <label key={id} htmlFor={id}>
            <input
              className="sr-only"
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div
              className={`leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 ${
                checked ? "border-gray-500" : "border-neutral-50"
              }`}
            >
              {value}
            </div>
          </label>
        );
      })}
    </>
  );
}

function ProductGallery({ media }) {
  const ref = useRef();

  const TOTAL_LENGTH = media.length * 100;
  let current_position = 0;
  const INITIAL_POSITION = 0;
  const MOVE = 100;

  if (!media.length) {
    return null;
  }

  return (
    <section className="relative px-4">
      <div className="relative overflow-hidden">
        <div className="h-full w-full flex duration-700" ref={ref}>
          {media.map((mediaItem) => {
            const data = {
              ...mediaItem,
              image: {
                ...mediaItem.image,
                altText: mediaItem.alt || "Product image",
              },
            };
            return (
              <MediaFile
                key={mediaItem.id}
                tabIndex="0"
                className={`w-full h-full aspect-square object-contain`}
                data={data}
                options={{
                  crop: "center",
                }}
              />
            );
          })}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-slate-900 transition-all rounded-full p-1"
        onClick={() => {
          current_position <= INITIAL_POSITION
            ? (current_position = TOTAL_LENGTH - MOVE)
            : (current_position -= MOVE);
          ref.current.style.transform = `translateX(-${current_position}%)`;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 pr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-0 text-slate-700 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 transition-all rounded-full p-1"
        onClick={() => {
          current_position >= TOTAL_LENGTH - MOVE
            ? (current_position = INITIAL_POSITION)
            : (current_position += MOVE);
          ref.current.style.transform = `translateX(-${current_position}%)`;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 pl-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </section>
  );
}
