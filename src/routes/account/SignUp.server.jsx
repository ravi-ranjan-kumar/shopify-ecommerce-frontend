import { CacheNone, gql } from "@shopify/hydrogen";
import React from "react";
import SignUpForm from "../../components/Auth/SignUpForm.client";
import Layout from "../../components/Layout.server";

const SignUp = () => {
  return (
    <Layout>
      <SignUpForm />
    </Layout>
  );
};

export default SignUp;

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Respo();
    nse("Session storage not available.", { status: 400 });
  }
  let newCustomerInputs, fieldErrors, errorIndex;
  newCustomerInputs = await request.json();

  const { data, errors } = await queryShop({
    query: SIGNUP_MUTATION,
    variables: {
      input: { ...jsonBody },
    },
    cache: CacheNone(),
  });

  fieldErrors = data?.customerCreate?.customerUserErrors?.map((item) => ({
    [item?.field[1]]: item?.message,
  }));
  errorIndex = data?.customerCreate?.customerUserErrors.length - 1;

  if (data?.customerCreate?.customer) {
    return new Response(null, {
      status: 200,
    });
  }
  return new Response(JSON.stringify(fieldErrors[errorIndex] ?? errors), {
    status: 401,
  });
}

const SIGNUP_MUTATION = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        email
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;
