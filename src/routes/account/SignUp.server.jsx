import { CacheNone, gql } from "@shopify/hydrogen";
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
    return new Response("Session storage not available.", { status: 400 });
  }
  let newCustomerInputs, fieldErrors, errorIndex;
  newCustomerInputs = await request.json();

  console.log(newCustomerInputs);

  const { data, errors } = await queryShop({
    query: SIGNUP_MUTATION,
    variables: {
      input: { ...newCustomerInputs },
    },
    cache: CacheNone(),
  });

  console.log(data);
  console.log(errors);

  fieldErrors = data?.customerCreate?.customerUserErrors?.map((item) => ({
    [item?.field[1]]: item?.message,
  }));
  errorIndex = data?.customerCreate?.customerUserErrors?.length - 1;

  if (data?.customerCreate?.customer) {
    return new Response(null, {
      status: 200,
    });
  }
  return new Response(JSON.stringify(fieldErrors ? fieldErrors[errorIndex] : {error: "Something Went Wrong! try again later"}), {
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
