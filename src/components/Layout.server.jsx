import { Suspense } from "react";
import {
  useShopQuery,
  CacheLong,
  gql,
  Seo,
  useSession,
} from "@shopify/hydrogen";

import Header from "./client/Header.client";

const Layout = ({ children }) => {
  const {customerAccessToken} = useSession();

  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
  });

  const user = useShopQuery({
    query: getUser(customerAccessToken),
    cache: CacheLong(),
  });

  return (
    <>
      <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header
          shop={shop}
          session={customerAccessToken}
          user={user.data.customer}
        />
        <main role="main" id="mainContent" className="flex-grow bg-[#fcf6f5ff]">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
      </div>
    </>
  );
};
export default Layout;
const SHOP_QUERY = gql`
  query layout {
    shop {
      name
      description
    }
  }
`;

export function getUser(token) {
  return gql`
    query {
      customer(customerAccessToken: "${token}") {
        id
        firstName
        lastName
        displayName
        acceptsMarketing
        email
        phone
        defaultAddress{
          id
          address1
          address2
          city
          company
          country
          firstName
          lastName
          phone
          province
          zip
        }
      }
    }
  `;
}
