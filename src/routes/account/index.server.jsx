import { gql, useSession, useShopQuery } from "@shopify/hydrogen";
import AddAddressFormButton from "../../components/client/AddAddressFormButton.client";
import EditAddressForm from "../../components/client/AddAddressFormButton.client";
import CustomerDetailsCard from "../../components/client/CustomerDetailsCard.client";
import Layout, { getUser } from "../../components/Layout.server";
import UserAddress from "../../components/client/UserAddressCard.client";

const UserAccount = () => {
  const { customerAccessToken } = useSession();

  const {
    data: { customer },
  } = useShopQuery({
    query: getUser(customerAccessToken),
  });

  return (
    <Layout>
      <h2 className="text-4xl w-11/12 font-bold mx-auto my-8">
        <span>Hey!</span> {customer.displayName}
      </h2>
      <CustomerDetailsCard customer={customer} />
      <section className="w-11/12 mx-auto my-14">
        <h2 className="text-xl font-bold underline underline-offset-4 text-slate-700">
          Addresses
        </h2>
        {customer.defaultAddress ? (
          <div className="">
            <UserAddress address={customer.defaultAddress} />
          </div>
        ) : (
          <AddAddressFormButton />
        )}
      </section>
    </Layout>
  );
};

export default UserAccount;
