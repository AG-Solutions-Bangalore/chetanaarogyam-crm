import { Link, NavLink, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineFileDownload, MdSpaceDashboard } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { TbInvoice } from "react-icons/tb";
import logo from "../assets/logo.png";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BsReceiptCutoff } from "react-icons/bs";

const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();

  // Hardcoded sidenavType to "dark"
  const sidenavType = "dark";

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-blue-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // close sidebar when clicking outside

  useEffect(() => {
    function handClickOutside(e) {
      if (sidenavRef.current && !sidenavRef.current.contains(e.target)) {
        setOpenSideNav(false);
      }
    }

    document.addEventListener("mousedown", handClickOutside);
    return () => {
      document.removeEventListener("mousedown", handClickOutside);
    };
  }, [setOpenSideNav]);

  // Close sidebar on route change
  useEffect(() => {
    setOpenSideNav(false);
  }, [pathname, setOpenSideNav]);
  const id = localStorage.getItem("user_type_id");
  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative  `}>
        <Link to="/home" className="flex items-center justify-center  ">
          <div>
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSideNav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4 relative">
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <NavLink to="/home">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <MdSpaceDashboard className="w-5 h-5 text-inherit " />

                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Dashboard
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          {id === "2" && (
            <>
              <li>
                <NavLink to="/master-service">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <FaRegUser className="w-5 h-5 text-inherit" />

                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        Master
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/enquire">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <FaUsers className="w-5 h-5 text-inherit" />

                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        Enquires
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/customer">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <BsReceiptCutoff className="w-5 h-5 text-inherit" />

                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        Customers
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/invoice">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <TbInvoice className="w-5 h-5 text-inherit" />

                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        Invoice
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/p-receivedlist">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <RiMoneyRupeeCircleFill className="w-5 h-5 text-inherit" />

                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        Payment
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            </>
          )}
          {id === "1" && (
            <>
              {" "}
              <li>
                <NavLink to="/direct-reffer">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <FaUsers className="w-5 h-5 text-inherit" />

                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        Referral
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/wallet">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <GiWallet className="w-5 h-5 text-inherit" />

                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        Wallet
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/download">
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <MdOutlineFileDownload className="w-5 h-5 text-inherit" />

                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        Downloads
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex justify-center">
        {" "}
        <h1 className="text-white border-dashed-orange-600  text-sm absolute bottom-4">
          Updated on :Dec 06th,2024
        </h1>
      </div>
    </aside>
  );
};
export default SideNav;
