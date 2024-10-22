import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCopy } from "react-icons/io";

import Logout from "./Logout";
import { useState } from "react";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { toast } from "react-toastify";

const DashboardNavbar = ({ openSideNav, setOpenSideNav }) => {
  const { pathname } = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false); // Separate state for the share menu

  const handleOpenLogout = () => setOpenModal(!openModal);

  const pathSegments = pathname.split("/").filter((el) => el !== "");

  const breadcrumbs = [
    { name: "Home", link: "/home" },
    ...pathSegments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      link: `/${pathSegments.slice(0, index + 1).join("/")}`,
    })),
  ];

  const pageTitle =
    pathSegments.length === 0
      ? "Home"
      : pathSegments[pathSegments.length - 1]?.charAt(0).toUpperCase() +
        pathSegments[pathSegments.length - 1]?.slice(1);

  // Hardcode fixedNavbar to true
  const fixedNavbar = true;

  // Referral message with the current user ID
  const referralMessage = `Hello, I'm a member of Chetana Aarogyam, and I'd like you to join as well. Please register yourself by clicking the link below. https://chetanaarogyam.com/index.html?id=${localStorage.getItem(
    "username"
  )}`;

  const handleWhatsAppShare = (e) => {
    e.preventDefault();
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
      referralMessage
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const handleEmailShare = (e) => {
    e.preventDefault();
    const subject = "Join Chetana Aarogyam";
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(referralMessage)}`;
    window.location.href = mailtoLink;
  };

  const handleCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(referralMessage).then(() => {
      // alert("Referral link copied to clipboard!");
      toast.info("Referral link copied to clipboard!");
    });
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 bg-gradient-to-br from-gray-800 text-white to-gray-700 shadow-lg shadow-blue-900"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex justify-between gap-6 flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <Link key={index} to={breadcrumb.link}>
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {breadcrumb.name}
                </Typography>
              </Link>
            ))}
          </Breadcrumbs>
          <Typography variant="h6" color="white">
            {pageTitle}
          </Typography>
        </div>
        <div className="flex items-center">
          {/* Sidebar toggle button for mobile view */}
          <IconButton
            variant="text"
            color="white"
            className="grid xl:hidden"
            onClick={() => setOpenSideNav(!openSideNav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-white" />
          </IconButton>

          {/* Share Menu */}
          <Menu
            open={shareMenuOpen}
            handler={setShareMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <IconButton variant="text" color="orange">
                <FaShareAlt className="h-5 w-5 text-red" />
              </IconButton>
            </MenuHandler>
            <MenuList className="bg-gray-700">
              <MenuItem onClick={handleWhatsAppShare} className="text-white">
                <FaWhatsapp className=" h-5 w-5 inline-flex mr-2" />
                Whatsapp
              </MenuItem>
              <MenuItem onClick={handleEmailShare} className="text-white">
                <MdEmail className="i h-5 w-5 inline-flex mr-2" />
                Email
              </MenuItem>
              <MenuItem onClick={handleCopyLink} className="text-white">
                <IoMdCopy className="h-5 w-5 inline-flex mr-2" />
                Copy
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Profile Menu */}
          <Menu
            open={profileMenuOpen}
            handler={setProfileMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <IconButton variant="text" color="orange">
                <UserCircleIcon className="h-5 w-5 text-red" />
              </IconButton>
            </MenuHandler>
            <MenuList className="bg-gray-700">
              <MenuItem>
                <Link to="/profile" className="text-white">
                  Profile
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Settings icon */}
          <IconButton variant="text" color="red" onClick={handleOpenLogout}>
            <HiArrowRightStartOnRectangle className="h-5 w-5 text-red" />
          </IconButton>
        </div>
      </div>
      <Logout open={openModal} handleOpen={handleOpenLogout} />
    </Navbar>
  );
};

export default DashboardNavbar;
