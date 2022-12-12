import React from "react";
import Layout from "../../components/Layout.server";
import LoginForm from "../../components/LoginForm.client";
import { Suspense } from "react";
import { CacheNone, gql, useShopQuery } from "@shopify/hydrogen";
const Login = () => {
  // const {data} = useShopQuery({
  //   query: QUERY,
  //   variables: {
  //     input: {
  //       firstName: "John",
  //       lastName: "Smith",
  //       email: "johnsmi@shopify.com",
  //       phone: "+15146777999",
  //       password: "5hopify",
  //       acceptsMarketing: true
  //     }
  //   },
  // });
  // console.log(data);

  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Login;

const QUERY = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export async function api(request, { session, queryShop }) {
  console.log("hii");
  if (!session) {
    return new Response("Session storage not available.", { status: 400 });
  }

  const jsonBody = await request.json();

  console.log(jsonBody);
  console.log(jsonBody.password);

  if (!jsonBody.email || !jsonBody.password) {
    return new Response(
      JSON.stringify({ error: "Incorrect email or password." }),
      { status: 400 }
    );
  }

  const { data, errors } = await queryShop({
    query: LOGIN_MUTATION,
    variables: {
      input: {
        email: jsonBody.email,
        password: jsonBody.password,
      },
    },
    cache: CacheNone(),
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    await session.set(
      "customerAccessToken",
      data.customerAccessTokenCreate.customerAccessToken.accessToken
    );

    return new Response(null, {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        error: data?.customerAccessTokenCreate?.customerUserErrors ?? errors,
      }),
      { status: 401 }
    );
  }
}

const LOGIN_MUTATION = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;
