import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import moment from "moment";
import { HiMiniMinus } from "react-icons/hi2";
import { TfiReload } from "react-icons/tfi";
import { MdCancel } from "react-icons/md";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

const Home = () => {
  const dateyear = ["2023-24"];

  const [referral, setReferral] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [fullClose, setFullClose] = useState(true);
  const [loadingRecentOrders, setLoadingRecentOrders] = useState(false); // Loading state for orders
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch both data sets but manage loading states separately
  const fetchDirectReferral = async () => {
    setLoadingRecentOrders(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-dashboard-data/${dateyear}`,
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
    fetchDirectReferral();
  }, []);

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

  return (
    <Layout>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          {/* <div className="bg-[#5e7081] text-white flex items-center justify-center flex-col text-center md:h-24 py-4 rounded-lg transition-transform duration-400">
            <p className="text-md font-bold">Direct Referral</p>
            <p className="text-xl font-bold">
              <CountUp start={0} end={referral.inquiry_count} />
            </p>
          </div> */}

          <div>
            <div className="bg-[#5e7081] text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Direct Referral</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={referral.inquiry_count} />
              </p>
            </div>
          </div>
          <div>
            <div className="bg-blue-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Second Referral</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={referral.customer_count} />
              </p>
            </div>
          </div>
          <div>
            <div className="bg-green-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Total Wallet</h3>
              <p className="text-5xl font-bold">
                <CountUp start={0} end={referral.invoice_open_count} />
              </p>
            </div>
          </div>

          {localStorage.getItem("user_type_id") == 2 && (
            <div>
              <div className="bg-purple-500 text-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold">Total Donors</h3>
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
                  <h1>Direct Referral</h1>
                </div>
                <div className="flex gap-3">
                  <div>
                    <HiMiniMinus
                      className="text-2xl cursor-pointer"
                      onClick={() => setShowTable(!showTable)}
                    />
                  </div>
                  <div>
                    <TfiReload
                      className="text-xl cursor-pointer"
                      onClick={handleReload}
                    />
                  </div>
                  <div>
                    <MdCancel
                      className="text-2xl cursor-pointer"
                      onClick={() => setFullClose(false)}
                    />
                  </div>
                </div>
              </div>
              {loadingRecentOrders ? (
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
                                        {order.area}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.full_name}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.mobile}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.service}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {order.status}
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
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
