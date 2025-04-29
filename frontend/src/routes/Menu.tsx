import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "../components/shadcn/Button";
import { Card, CardContent } from "../components/shadcn/Card";
import { Input } from "../components/shadcn/Input";
import { Tabs, TabsList, TabsTrigger } from "../components/shadcn/Tabs";
import axios from "axios";
import { MenuData } from "../types/types";

// Menu data
const menuItems = [
  {
    id: 1,
    itemName: "Bruschetta",
    descr: "Toasted bread topped with tomatoes, garlic, and fresh basil",
    cost: 8.99,
    category: "starters",
    image: "/placeholder.svg?height=100&width=200",
  },
];

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  const getMenuItems = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/menu/get-menu-items`,
      { withCredentials: true }
    );
    setMenuData(res.data.data.menuItems);
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  console.log(menuData);
  // Filter menu items based on search query and active category
  const filteredItems = menuData.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

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
            <TabsTrigger value="starters">Starters</TabsTrigger>
            <TabsTrigger value="main-course">Main Course</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.itemName}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2 mt-20">
                  <h3 className="font-semibold text-lg">{item.itemName}</h3>
                  <span className="font-bold text-primary">
                    ₹{item.cost.toFixed(2)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {item.desc}
                </p>
                <Button
                  size="sm"
                  className="w-full bg-[#A8E6CF] hover:bg-[#97d1bc]"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
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
