import { Home, BookOpen, History } from "lucide-react";
import { NavLink } from "react-router";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between px-8 py-4 bg-[#A8E6CF]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-white bg-[#26A69A] px-3 py-2 rounded-xl transition"
            : "flex flex-col items-center text-gray-800 px-3 py-2"
        }
      >
        <Home />
        <p className="text-sm">Home</p>
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-white bg-[#26A69A] px-3 py-2 rounded-xl transition"
            : "flex flex-col items-center text-gray-800 px-3 py-2"
        }
      >
        <BookOpen />
        <p className="text-sm">Menu</p>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-white bg-[#26A69A] px-3 py-2 rounded-xl transition"
            : "flex flex-col items-center text-gray-800 px-3 py-2"
        }
      >
        <History />
        <p className="text-sm">History</p>
      </NavLink>
    </div>
  );
}
