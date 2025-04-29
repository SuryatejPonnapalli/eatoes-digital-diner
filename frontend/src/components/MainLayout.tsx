import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => (
  <div>
    <div className="fixed top-0 w-full z-20">
      <Navbar />
    </div>
    <div className="main-content">
      <Outlet />
    </div>
    <div className="fixed bottom-0 right-0 w-full z-20">
      <Footer />
    </div>
  </div>
);

export default MainLayout;
