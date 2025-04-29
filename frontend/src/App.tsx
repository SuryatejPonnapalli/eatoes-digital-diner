import { useEffect, useState } from "react";
import axios from "axios";
import { MenuData } from "./types/types";

function App() {
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  const fetchMenuData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/menu/get-menu-items`,
      {
        withCredentials: true,
      }
    );
    setMenuData(response.data.data.menuItems);
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  console.log(menuData);

  return (
    <div className="container pt-20 pb-20 mx-auto py-12 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 after:content-[''] after:block after:w-20 after:h-1 after:bg-[#A8E6CF] after:mt-2">
          About
        </h2>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl leading-relaxed">
          "The Digital Diner" is a small, popular restaurant looking to improve
          its customer experience by allowing users to browse their menu and
          place simple pickup orders online.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 after:content-[''] after:block after:w-20 after:h-1 after:bg-[#A8E6CF] after:mt-2">
          Featured
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuData.slice(0, 4).map((item: MenuData, index: number) => (
            <div
              key={index}
              className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  alt={`${item.itemName} image`}
                />
              </div>
              <div className="flex flex-col p-4 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-base md:text-lg">
                    {item.itemName}
                  </h3>
                  <span className="font-semibold text-base md:text-lg">
                    ₹{item.cost}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {item.desc}
                </p>
                <button className="bg-[#A8E6CF] hover:bg-[#97d1bc] text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 w-full">
                  Order now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
