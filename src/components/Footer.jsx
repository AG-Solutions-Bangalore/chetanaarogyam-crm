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
    <footer className="bg-gray-800 text-white p-4 text-center rounded-lg  xl:ml-80 mb-3 mx-3 shadow-lg shadow-blue-900">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2">
        <Typography variant="small" className="font-normal text-inherit">
          Copyright@ {currentYear} by
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName}
          </a>{" "}
          . All rights reserved.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
