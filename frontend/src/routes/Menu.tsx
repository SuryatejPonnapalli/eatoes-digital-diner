import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "../components/shadcn/Button";
import { Input } from "../components/shadcn/Input";
import { Tabs, TabsList, TabsTrigger } from "../components/shadcn/Tabs";
import axios from "axios";
import { MenuData } from "../types/types";
import useCart from "../hooks/cartHooks";

import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [loadingState, setLoadingState] = useState(true);

  const context = useContext(CartContext);
  if (!context) throw new Error("Must be used within CartContextProvider");
  const { cart } = context;

  const { addItem, increaseQuantity, decreaseQuantity } = useCart();

  const getMenuItems = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/menu/get-menu-items`,
        { withCredentials: true }
      );
      setMenuData(res.data.data.menuItems);
    } catch (error) {
      alert("Problem fetching details.");
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  const checkIfOrdered = (item: MenuData) =>
    cart.find((p) => p.itemName === item.itemName);

  // Filter menu items based on search query and active category
  const filteredItems = menuData.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  if (loadingState) {
    return (
      <div className="mt-20 px-4">
        Fetching details, please wait...(Might take a while due to render
        backend)
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 pt-20 pb-20">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 after:content-[''] after:block after:w-20 after:h-1 after:bg-[#A8E6CF] after:mt-2">
        Menu
      </h1>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search menu..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="starter">Starters</TabsTrigger>
            <TabsTrigger value="main-course">Main Course</TabsTrigger>
            <TabsTrigger value="dessert">Desserts</TabsTrigger>
            <TabsTrigger value="drink">Drinks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
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
                {(() => {
                  const existingItem = checkIfOrdered(item);

                  return existingItem ? (
                    <div className="flex flex-row bg-[#A8E6CF] hover:bg-[#97d1bc] text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 w-full justify-between items-center">
                      <div onClick={() => decreaseQuantity(item)}>-</div>
                      <div>{existingItem.quantity}</div>
                      <div onClick={() => increaseQuantity(item)}>+</div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full bg-[#A8E6CF] hover:bg-[#97d1bc]"
                      onClick={() => {
                        addItem(item);
                      }}
                    >
                      Add to Cart
                    </Button>
                  );
                })()}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 pt-20 pb-20">
            <p className="text-muted-foreground">
              No menu items found. Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
