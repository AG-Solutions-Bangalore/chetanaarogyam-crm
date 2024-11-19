import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { HiMiniMinus } from "react-icons/hi2";
import Loader from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { TbReload } from "react-icons/tb";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  const [referral, setReferral] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [fullClose, setFullClose] = useState(true);
  const [loadingRecentOrders, setLoadingRecentOrders] = useState(false); // Loading state for orders
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState("");

  const fetchDirectReferral = async () => {
    if (!currentYear) return;
    setLoadingRecentOrders(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-dashboard-data/${currentYear}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setReferral(response.data);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    } finally {
      setLoadingRecentOrders(false);
    }
  };

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
  useEffect(() => {
    fetchDirectReferral();
  }, [currentYear]);

  // Reload for recent orders
  const handleReload = () => {
    fetchDirectReferral(); // Only reload recent orders, not products
  };

  // Slide functionality for product carousel
  useEffect(() => {
    if (products && products.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [products]);
  const userid = localStorage.getItem("user_type_id");
  return (
    <Layout>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          <div>
            <div className="bg-[#5e7081] text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[120px] flex flex-col items-center justify-center">
              {userid === "1" ? (
                <h1 className="text-xl font-bold">Direct Referral</h1>
              ) : (
                <h1 className="text-xl font-bold">Total Enquire</h1>
              )}
              <p className="text-5xl font-bold">
                <CountUp start={0} end={referral.inquiry_count} />
              </p>
            </div>
          </div>
          <div>
            <div className="bg-blue-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[120px] flex flex-col items-center justify-center">
              {userid === "1" ? (
                <h1 className="text-xl font-bold">Second Referral</h1>
              ) : (
                <h1 className="text-xl font-bold">Total Customer</h1>
              )}
              <p className="text-5xl font-bold">
                <CountUp start={0} end={referral.customer_count} />
              </p>
            </div>
          </div>
          <div>
            <div className="bg-green-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[120px] flex flex-col items-center justify-center">
              {userid === "1" ? (
                <h3 className="text-xl font-bold">Total Wallet</h3>
              ) : (
                <h1 className="text-xl font-bold">Open Invoice</h1>
              )}
              <p className="text-5xl font-bold">
                <CountUp start={0} end={referral.invoice_open_count} />
              </p>
            </div>
          </div>

          {localStorage.getItem("user_type_id") == 2 && (
            <div>
              <div className="bg-purple-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[120px] flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold">Close Invoice</h1>

                <p className="text-5xl font-bold">
                  <CountUp start={0} end={referral.invoice_close_count} />
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10">
          {fullClose && (
            <div className="container mx-auto col-span-2">
              <div className="flex justify-between bg-white p-4 rounded-sm">
                <div className="content-center">
                  {userid === "2" ? (
                    <h1>Latest Enquires</h1>
                  ) : (
                    <h1>Direct Referral</h1>
                  )}
                </div>
                <div className="flex gap-3">
                  <div>
                    <HiMiniMinus
                      className="text-2xl mt-0.5 cursor-pointer"
                      onClick={() => setShowTable(!showTable)}
                    />
                  </div>
                  <div>
                    <TbReload
                      className="text-xl mt-1 cursor-pointer"
                      onClick={handleReload}
                    />
                  </div>
                  <div>
                    <CloseIcon
                      className="text-2xl  cursor-pointer"
                      onClick={() => setFullClose(false)}
                    />
                  </div>
                </div>
              </div>
              {/* {loadingRecentOrders ? (
                <Loader />
              ) : (
                showTable && (
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                            {localStorage.getItem("user_type_id") == 2 && (
                              <thead className="bg-gray-400 font-medium text-white dark:border-white/10">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    ID
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Full Name
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Mobile
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Area
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Service
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                            )}
                            {localStorage.getItem("user_type_id") == 1 && (
                              <thead className="bg-gray-400 font-medium text-white dark:border-white/10">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    ID
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Full Name
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Mobile
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Email
                                  </th>
                                  <th scope="col" className="px-6 py-4 ">
                                    Referral Id
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    No of Referral
                                  </th>
                                </tr>
                              </thead>
                            )}
                            {localStorage.getItem("user_type_id") == 1 && (
                              <tbody>
                                {referral?.inquiry_latest?.length > 0 ? (
                                  referral.inquiry_latest.map((order, key) => (
                                    <tr
                                      key={key}
                                      className="border-b border-neutral-200 bg-white"
                                    >
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.id}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.full_name}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.mobile}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.email}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.name}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.purch}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={6}
                                      className="px-6 py-4 text-center text-2xl font-bold text-blue-grey-600"
                                    >
                                      No data available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            )}
                            {localStorage.getItem("user_type_id") == 2 && (
                              <tbody>
                                {referral?.inquiry_latest?.length > 0 ? (
                                  referral.inquiry_latest.map((order, key) => (
                                    <tr
                                      key={key}
                                      className="border-b border-neutral-200 bg-white"
                                    >
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {order.id}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.fullname}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.mobile_no}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.area}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.interested_in}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.inquiry_status}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={6}
                                      className="px-6 py-4 text-center text-2xl font-bold text-blue-grey-600"
                                    >
                                      No data available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )} */}
              {loadingRecentOrders ? (
                <div className="flex justify-center items-center ">
                  <Loader />
                </div>
              ) : (
                showTable && (
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                            {/* Render Table Header */}
                            <thead className="bg-gray-400 font-medium text-white dark:border-white/10">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-4 text-center"
                                >
                                  ID
                                </th>
                                <th scope="col" className="px-6 py-4">
                                  Full Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                  Mobile
                                </th>
                                {localStorage.getItem("user_type_id") == 1 ? (
                                  <>
                                    <th scope="col" className="px-6 py-4">
                                      Email
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                      Referral Id
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                      No of Referral
                                    </th>
                                  </>
                                ) : (
                                  <>
                                    <th scope="col" className="px-6 py-4">
                                      Area
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                      Service
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                      Status
                                    </th>
                                  </>
                                )}
                              </tr>
                            </thead>

                            {/* Render Table Body */}
                            <tbody>
                              {referral?.inquiry_latest?.length > 0 ? (
                                referral.inquiry_latest.map((order, key) => (
                                  <tr
                                    key={key}
                                    className="border-b border-neutral-200 bg-white"
                                  >
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-left">
                                      {order.id}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-left">
                                      {order.full_name || order.fullname}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-left">
                                      {order.mobile || order.mobile_no}
                                    </td>
                                    {localStorage.getItem("user_type_id") ==
                                    1 ? (
                                      <>
                                        <td className="whitespace-nowrap px-6 py-4 text-left">
                                          {order.email}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-left">
                                          {order.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-left">
                                          {order.purch}
                                        </td>
                                      </>
                                    ) : (
                                      <>
                                        <td className="whitespace-nowrap px-6 py-4 text-left">
                                          {order.area}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-left">
                                          {order.interested_in}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-left">
                                          {order.inquiry_status}
                                        </td>
                                      </>
                                    )}
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    colSpan={6}
                                    className="px-6 py-4 text-center text-2xl font-bold text-blue-grey-600"
                                  >
                                    No data available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
