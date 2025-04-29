import logo from "../assets/logo.jpg";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center px-4 py-4 bg-[#A8E6CF]">
      <div className="flex flex-row items-center gap-2">
        <img src={logo} alt="logo of eatoes" className="size-8" />
        <div className="font-extralight">The Digital Diner</div>
      </div>
      <div className="">
        <ShoppingCart />
        <div className="flex items-center justify-center text-sm font-extralight absolute right-2 top-2 size-4 rounded-full text-black bg-white">
          <p className="">1</p>
        </div>
      </div>
    </div>
  );
}
