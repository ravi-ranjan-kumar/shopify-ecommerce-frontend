import { gql } from "@shopify/hydrogen";

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }

  const email = await request.json();
  console.log(email);

  const { data, errors } = await queryShop({
    query: FORGOT_QUERY,
    variables: {
      email,
    },
  });

  if (data?.customerRecover?.customerUserErrors?.length === 0) {
    return new Response(null, {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify(
        data?.customerRecover?.customerUserErrors[0]?.error ?? errors[0]
      ),
      { status: 401 }
    );
  }
}

const FORGOT_QUERY = gql`
  mutation sendPasswordRecoverEmail($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        message
      }
    }
  }
`;
