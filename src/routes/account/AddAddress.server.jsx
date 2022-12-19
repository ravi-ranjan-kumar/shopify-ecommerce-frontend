import { gql } from "@shopify/hydrogen";

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }

  const { customerAccessToken } = await session?.get();
  const address = await request?.json();

  const { data } = await queryShop({
    query: CREATE_USER_QUERY,
    variables: {
      customerAccessToken,
      address: { ...address },
    },
  });

  if (data?.customerAddressCreate?.customerAddress) {
    return new Response(null, {
      status: 200,
    });
  }
  return new Response(
    JSON.stringify({
      error: data?.customerAddressUpdate?.customerUserErrors[0]?.message,
    }),
    { status: 401 }
  );
}

const CREATE_USER_QUERY = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerUserErrors {
        message
      }
      customerAddress {
        id
      }
    }
  }
`;
