import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
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
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCopy } from "react-icons/io";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Logout from "./Logout";
import { toast } from "react-toastify";

const DashboardNavbar = ({ openSideNav, setOpenSideNav }) => {
  const { pathname } = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  // const elementRef = useRef(null);

  const pathSegments = pathname.split("/").filter((el) => el !== "");

  const breadcrumbs = [
    { name: "Home", link: "/home" },
    ...pathSegments.slice(0, 1).map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      // link: `/home/${segment}`,
    })),
  ];

  const referralMessage = `Hello, I'm a member of Chetana Aarogyam, and I'd like you to join as well. Please register yourself by clicking the link below. https://chetanaarogyam.com/index.html?id=${localStorage.getItem(
    "username"
  )}`;

  const handleWhatsAppShare = () => {
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
      referralMessage
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const handleEmailShare = () => {
    const subject = "Join Chetana Aarogyam";
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(referralMessage)}`;
    window.location.href = mailtoLink;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralMessage).then(() => {
      toast.info("Referral link copied to clipboard!");
    });
  };

  const handleOpenLogout = () => setOpenModal(!openModal);
  const navigate = useNavigate();


  return (
    <Navbar
      color="white"
      className="rounded-xl sticky top-4 z-40 py-3 bg-gradient-to-br from-gray-800 text-white to-gray-700 shadow-lg shadow-blue-900"
      fullWidth
      blurred
    >
      <div className="flex flex-wrap justify-between gap-6 items-center">
        {/* Breadcrumbs */}
        <div className="capitalize">
          <Breadcrumbs className="bg-transparent p-0">
            {breadcrumbs.map((breadcrumb, index) => (
              <Link key={index} to={breadcrumb.link}>
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal opacity-50 hover:text-blue-500 hover:opacity-100"
                >
                  {breadcrumb.name}
                </Typography>
              </Link>
            ))}
          </Breadcrumbs>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Sidebar toggle button */}
          <IconButton
            variant="text"
            color="white"
            className="xl:hidden"
            aria-label="Toggle Sidebar"
            onClick={() => setOpenSideNav(!openSideNav)}
          >
            <HiOutlineMenuAlt3 strokeWidth={3} className="h-6 w-6 text-white" />
          </IconButton>

          {/* Share Menu */}
          <Menu
            open={shareMenuOpen}
            handler={setShareMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <IconButton
                variant="text"
                color="orange"
                aria-label="Share Options"
              >
                <FaShareAlt className="h-5 w-5 " />
              </IconButton>
            </MenuHandler>
            <MenuList className="bg-gray-700">
              <MenuItem onClick={handleWhatsAppShare} className="text-white">
                <FaWhatsapp className="h-5 w-5 inline-flex mr-2 text-green-500" />
                Whatsapp
              </MenuItem>
              <MenuItem onClick={handleEmailShare} className="text-white">
                <MdEmail className="h-5 w-5 inline-flex mr-2 text-red-300" />
                Email
              </MenuItem>
              <MenuItem onClick={handleCopyLink} className="text-white">
                <IoMdCopy className="h-5 w-5 inline-flex mr-2 text-black" />
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
              <IconButton
                variant="text"
                color="orange"
                aria-label="Profile Options"
              >
                <UserCircleIcon
                  className="h-5 w-5 text-yellow-700"
                  onClick={() => navigate("/profile")}
                />
              </IconButton>
            </MenuHandler>
            {/* Uncomment the MenuList if needed */}
            {/* <MenuList className="bg-gray-700">
    <MenuItem>
      <Link to="/profile" className="text-white">
        Profile
      </Link>
    </MenuItem>
  </MenuList> */}
          </Menu>

          {/* Logout */}
          <IconButton
            variant="text"
            color="red"
            aria-label="Logout"
            onClick={handleOpenLogout}
          >
            <HiArrowRightOnRectangle className="h-5 w-5 text-red-600" />
          </IconButton>
        </div>
      </div>
      <Logout open={openModal} handleOpen={handleOpenLogout} />
    </Navbar>
  );
};

export default DashboardNavbar;
