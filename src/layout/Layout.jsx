import { useState } from "react";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import SideNav from "../components/SideNav";

const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-blue-gray-50/50">
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
      <div className="flex-1 p-4 xl:ml-80">
        <DashboardNavbar
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
        {children}
      </div>
      <Footer className="text-blue-gray-600 " />
    </div>
  );
};

export default Layout;
