import { Home, BookOpen, History } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between px-8 py-4 bg-[#A8E6CF]">
      <div className="flex flex-col items-center">
        <Home />
        <p className="text-sm">Home</p>
      </div>
      <div className="flex flex-col items-center">
        <BookOpen />
        <p className="text-sm">Menu</p>
      </div>
      <div className="flex flex-col items-center">
        <History />
        <p className="text-sm">History</p>
      </div>
    </div>
  );
}
