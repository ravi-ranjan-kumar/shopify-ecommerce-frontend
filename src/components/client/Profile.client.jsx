import { Link } from "@shopify/hydrogen";

const Profile = ({ session, user, setShowProfile }) => {
  const handleLogout = () => {
    fetch("/account/logout", {
      method: "POST",
    }).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <>
      {session ? (
        <div className="absolute flex flex-col -left-14 mt-6 space-y-3 bg-yellow-50 p-4 w-56 shadow-md">
          <p className="font-bold text-md text-red-500">
            Hi, {user?.displayName}!
          </p>
          <Link to="/account" className="font-medium">
            Account
          </Link>
          <button
            onClick={handleLogout}
            className="font-medium bg-red-500 py-2 px-3 rounded text-yellow-50"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div
          className="absolute w-32 top-5 right-0 mt-6 space-y-3 p-4 bg-yellow-50 shadow-md"
          onClick={() => setShowProfile(false)}
        >
          <Link
            className="font-medium block w-fit mx-auto bg-blue-500 py-2 px-3 rounded text-yellow-50"
            to="account/login"
          >
            Login
          </Link>
          <p className="text-center">-Or-</p>
          <Link
            className="font-medium block w-fit mx-auto bg-blue-500 py-2 px-3 rounded text-yellow-50"
            to="account/signup"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default Profile;
