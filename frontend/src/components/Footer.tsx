import { Home, BookOpen, History } from "lucide-react";
import { NavLink } from "react-router";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between px-8 py-2 bg-[#A8E6CF]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-white bg-[#26A69A] px-3 py-2 rounded-xl transition"
            : "flex flex-col items-center text-gray-800 px-3 py-2"
        }
      >
        <Home size={20} />
        <p className="text-xs">Home</p>
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-white bg-[#26A69A] px-3 py-2 rounded-xl transition"
            : "flex flex-col items-center text-gray-800 px-3 py-2"
        }
      >
        <BookOpen size={20} />
        <p className="text-xs">Menu</p>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-white bg-[#26A69A] px-3 py-2 rounded-xl transition"
            : "flex flex-col items-center text-gray-800 px-3 py-2"
        }
      >
        <History size={20} />
        <p className="text-xs">History</p>
      </NavLink>
    </div>
  );
}
