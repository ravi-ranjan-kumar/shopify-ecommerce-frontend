import { Link, useCart } from "@shopify/hydrogen";

const Header = ({ shop }) => {
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

        <div className="flex gap-8 text-md">
          <Link className="font-medium" to="collections">
            Collections
          </Link>
          <Link className="font-medium" to="products">
            products
          </Link>
        </div>
        <div className="relative ml-14"><Link to="/cart/carts"><IconBag /><CartBadge /></Link></div>
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
    <div
      className='text-white bg-red-500 absolute -bottom-[1px] right-0 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px'
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
