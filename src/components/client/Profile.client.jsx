import { Link } from "@shopify/hydrogen";

const Profile = ({ user }) => {
  const handleLogout = () => {
    fetch("/account/logout", {
      method: "POST",
    }).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="absolute flex flex-col -left-14 mt-6 space-y-3 bg-yellow-50 p-4 w-56">
      <p className="font-bold text-md text-red-500">Hi, {user?.displayName}!</p>
      <Link to="/account" className="font-medium">
        Account
      </Link>
      {/* <p className="font-medium">Account</p> */}
      <button
        onClick={handleLogout}
        className="font-medium bg-red-500 py-2 px-3 rounded text-yellow-50"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
