import { Typography } from "@material-tailwind/react";
import BASE_URL from "../base/BaseUrl";
import axios from "axios";
import { useEffect, useState } from "react";

export function Footer() {
  // const year = new Date().getFullYear();
  const brandName = "AG Solutions";
  const brandLink = "https://www.ag-solutions.in";
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-year`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCurrentYear(response.data.year.current_year);
        console.log(response.data.year.current_year);
      } catch (error) {
        console.error("Error fetching year data:", error);
      }
    };

    fetchYearData();
  }, []);
  return (
    <footer className="bg-gray-800 text-white p-4 rounded-lg shadow-lg shadow-blue-900 xl:ml-80 mb-3 mx-3 text-center">
      <div className="flex flex-col md:flex-row w-full flex-wrap items-center justify-between gap-4 px-2">
        {/* Current Year Section */}
        <div className="w-full md:w-auto text-sm">
          Current Year - {currentYear}
        </div>

        {/* Brand Section */}
        <div className="w-full md:w-auto text-sm">
          Handcrafted with love by{" "}
          <a
            href={brandLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
