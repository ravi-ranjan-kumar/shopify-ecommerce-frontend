import { gql } from "@shopify/hydrogen";

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }
  const { customerAccessToken } = await session.get();
  const CustomerUpdateInput = await request.json();

  const { data } = await queryShop({
    query: UPDATE_CUSTOMER,
    variables: {
      customerAccessToken,
      customer: { ...CustomerUpdateInput },
    },
  });

  if (data?.customerUpdate?.customer?.id) {
    return new Response(null, {
      status: 200,
    });
  }

  return new Response(
    JSON.stringify({
      error: data?.customerUpdate?.customerUserErrors[0]?.message
    }),
    { status: 401 }
  );
}

const UPDATE_CUSTOMER = gql`
mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customer {
        id
      }
      customerUserErrors {
        message
      }
    }
  }`;
