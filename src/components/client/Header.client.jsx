import { Link, useCart, useNavigate, useServerProps } from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";
import Profile from "./Profile.client";

const Header = ({ shop, session, user }) => {
  const [showProfile, setShowProfile] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <header
        role="banner"
        className="flex items-center text-slate-800 h-16 py-6 px-24 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm"
      >
        <div className="flex gap-12 flex-1">
          <Link className="font-bold text-lg" to="/">
            {shop.name}
          </Link>
        </div>

        <form method="GET" action="/search" className="hidden lg:flex border rounded w-96">
          <input type="search" name="q" className="flex-1 outline-none h-full py-2 bg-transparent" />
          <button type="submit" className="border-l-2 px-3 py-2 text-slate-600 font-medium">Search</button>
        </form>

        <div className="flex gap-8 text-md items-center">
          <Link className="font-medium" to="collections">
            Collections
          </Link>
          <Link className="font-medium" to="products">
            Products
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              className="font-bold"
              onClick={() => setShowProfile((current) => !current)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={session ? "text-blue-500 w-6 h-6" : "black w-6 h-6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            {showProfile ? (
              session ? (
                <Profile session={session} user={user} />
              ) : (
                <div className="absolute top-5 right-0 flex flex-col mt-6 space-y-3 p-4 bg-yellow-50 shadow-md">
                  <Link
                    className="font-medium bg-blue-500 py-2 px-3 rounded text-yellow-50"
                    to="account/login"
                  >
                    Login
                  </Link>
                </div>
              )
            ) : null}
          </div>
        </div>
        <div className="relative ml-7">
          <Link to="/cart">
            <IconBag />
            <CartBadge />
          </Link>
        </div>
      </header>
    </>
  );
};
export default Header;

function IconBag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
      className="w-5 h-5"
    >
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </svg>
  );
}

function CartBadge() {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div className="text-white bg-red-500 absolute -bottom-[1px] right-0 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px">
      <span>{totalQuantity}</span>
    </div>
  );
}
