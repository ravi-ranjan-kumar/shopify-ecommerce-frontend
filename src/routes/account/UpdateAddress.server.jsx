import { gql } from "@shopify/hydrogen";
import { getUser } from "../../components/Layout.server";

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }
  
  const { customerAccessToken } = await session.get();
  const address = await request.json();

  const {
    data: { customer },
  } = await queryShop({
    query: getUser(customerAccessToken),
  });

  const { data } = await queryShop({
    query: UPDATE_USER_ADDRESS,
    variables: {
      id: customer.defaultAddress.id,
      customerAccessToken,
      address: { ...address },
    },
  });

  if (data?.customerAddressUpdate?.customerAddress) {
    return new Response(null, {
      status: 200,
    });
  }

  return new Response(
    JSON.stringify({
      error: data?.customerAddressUpdate?.customerUserErrors[0].message,
    }),
    { status: 401 }
  );
}

const UPDATE_USER_ADDRESS = gql`
  mutation customerAddressUpdate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $id: ID!
  ) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        message
      }
    }
  }
`;
