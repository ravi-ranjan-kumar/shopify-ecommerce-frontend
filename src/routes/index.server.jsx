import { useSession } from "@shopify/hydrogen";
import { Suspense } from "react";
import BestSelling from "../components/BestSelling.server";

import FeaturedCollections from "../components/FeaturedCollections.server";
import Layout from "../components/Layout.server";
import Login from "../components/Login.server";

export default function Home() {
  return (
    <Layout>
      <Suspense>
        <FeaturedCollections />
        <BestSelling />
        {/* <Login /> */}
      </Suspense>
    </Layout>
  );
}
