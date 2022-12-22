import { useUrl } from "@shopify/hydrogen";
import React, { Suspense, useEffect, useState } from "react";
import ProductCard from "../ProductCard.client";

const LoadMore = ({ products, url, filter }) => {
  let data = products?.nodes;
  const [allProducts, setAllProducts] = useState(data);
  const [cursor, setCursor] = useState(products?.pageInfo?.endCursor);
  const [hasNextPage, sethasNextPage] = useState(
    products?.pageInfo?.hasNextPage
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (filter !== undefined) {
      filterData(isSubscribed);
    }

    return () => (isSubscribed = false);
  }, [filter]);

  const filterData = async (isSubscribed) => {
    const postUrl = new URL(window.location.origin + url);
    postUrl.searchParams.append("page", allProducts.length);

    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pageBy: allProducts.length, filterBy: filter }),
    });

    const products = await response.json();

    const { endCursor, hasNextPage } = products?.pageInfo || {
      endCursor: "",
      hasNextPage: false,
    };

    const newProducts = products?.nodes;

    if (isSubscribed) {
      setCursor(endCursor);
      sethasNextPage(hasNextPage);
      setAllProducts([...newProducts]);
    }
  };

  const handleLoadMore = async (e) => {
    setIsLoading(true);
    const postUrl = new URL(window.location.origin + url);

    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cursor, filterBy: filter }),
    });
    setIsLoading(false);

    const products = await response.json();
    const { endCursor, hasNextPage } = products?.pageInfo || {
      endCursor: "",
      hasNextPage: false,
    };
    const newProducts = products?.nodes;
    setCursor(endCursor);
    sethasNextPage(hasNextPage);
    setAllProducts([...allProducts, ...newProducts]);
  };

  return (
    <>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {allProducts &&
            allProducts?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
        </div>
      </section>
      {hasNextPage && (
        <button
          onClick={handleLoadMore}
          className="bg-blue-500 py-2 px-4 w-32 block mb-8 mx-auto rounded-full text-yellow-50"
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default LoadMore;
