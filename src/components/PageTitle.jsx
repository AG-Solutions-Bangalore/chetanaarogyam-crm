import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PageTitle({ title, icon: Icon, backLink }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log("Back link clicked:", backLink);
    if (backLink === "-1") {
      navigate(-1);
    } else {
      navigate(backLink);
    }
  };

  return (
    <div
      className="flex items-center space-x-2 text-gray-900 text-xl cursor-pointer mt-4 mb-6"
      onClick={handleBackClick}
    >
      <div className="cursor-pointer">
        <FaArrowLeft />
      </div>
      <div className="font-bold text-gray-900 text-xl">{title}</div>
    </div>
  );
}

export default PageTitle;
