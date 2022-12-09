import { gql, useShopQuery } from "@shopify/hydrogen";
import React from "react";

const Login = () => {
//   const { data } = useShopQuery({
//     query: QUERY,
//     variables: {
//       input: {
//         firstName: "ravi",
//         lastName: "Smith",
//         email: "ravi@gmail.com",
//         phone: "+15146669852",
//         password: "5hopif",
//         acceptsMarketing: true,
//       },
//     },
//   });

    const token = useShopQuery({
      query: QUERYTOKEN,
    });

    const {data} = useShopQuery({
        query: AQUERY,
      });
      console.log(data);
    console.log(token.data.customerAccessTokenCreate.customerAccessToken.accessToken);
//   console.log(data.customerCreate.customer);
//   console.log(data.customerCreate.customerUserErrors);

  return <>Login</>;
};

export default Login;

const AQUERY = gql`
  query {
  customer(customerAccessToken: "bb415c3b188eac9e0cd324349cca3685") {
    id
    firstName
    lastName
    acceptsMarketing
    email
    phone
  }
}`;


const QUERYTOKEN = gql`
  mutation customerAccessTokenCreate {
    customerAccessTokenCreate(
      input: { email: "ravi@gmail.com", password: "5hopif" }
    ) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`;

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
