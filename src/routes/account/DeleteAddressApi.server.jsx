import { gql } from "@shopify/hydrogen";

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }

  const { customerAccessToken } = await session.get();
  const addressId = await request.json();

  const { data } = await queryShop({
    query: DELETE_ADDRESS_QUERY,
    variables: {
      id: addressId,
      customerAccessToken,
    },
  });

  if (data?.customerAddressDelete?.deletedCustomerAddressId) {
    return new Response(null, {
      status: 200,
    });
  }

  return new Response(
    JSON.stringify({
      error: "There is a problem in deleting this address",
    }),
    { status: 401 }
  );
}

const DELETE_ADDRESS_QUERY = gql`
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        message
      }
      deletedCustomerAddressId
    }
  }
`;
