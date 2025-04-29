import logo from "../assets/logo.jpg";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import { NavLink, Link } from "react-router";

export default function Navbar() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Must be used within CartContextProvider");
  const { cart } = context;

  return (
    <div className="flex flex-row justify-between items-center px-4 py-4 bg-[#A8E6CF]">
      <Link to="/" className="flex flex-row items-center gap-2">
        <img src={logo} alt="logo of eatoes" className="size-8" />
        <div className="font-extralight">The Digital Diner</div>
      </Link>
      <NavLink
        to="/checkout"
        className={({ isActive }) => (isActive ? " text-white" : "")}
      >
        <ShoppingCart />
        <div className="flex items-center justify-center text-sm font-extralight absolute right-2 top-2 size-4 rounded-full text-black bg-white">
          <p className="">{cart.length}</p>
        </div>
      </NavLink>
    </div>
  );
}
