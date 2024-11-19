import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button, Tooltip, IconButton, CircularProgress } from "@mui/material";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import { FaUserCheck } from "react-icons/fa";
const Enquires = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-enquires-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          setEnquiryData(response.data?.inquiry || []);
        }
      } catch (error) {
        console.error("Error fetching service data", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServiceData();

    return () => {
      isMounted = false;
    };
  }, []);

  const columns = [
    {
      name: "#",
      label: "#",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "fullname",
      label: "Service",
      options: { filter: true, sort: false },
    },
    {
      name: "mobile_no",
      label: "Amount",
      options: { filter: true, sort: false },
    },
    {
      name: "area",
      label: "Status",
      options: { filter: true, sort: false },
    },
    {
      name: "interested_in",
      label: "Status",
      options: { filter: true, sort: false },
    },
    {
      name: "inquiry_status",
      label: "Status",
      options: { filter: true, sort: false },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          const stringId = String(id);
          return (
            <div className="flex items-center">
              <Tooltip title="To Convert Customers" placement="top">
                <IconButton>
                  <Link
                    to={
                      `/customer-add/${id}`
                      // stringId.substring(stringId.indexOf("#") + 1)
                    }
                  >
                    <FaUserCheck className="text-blue-600" />
                  </Link>
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    responsive: "standard",
    download: false,
    print: false,
    viewColumns: true,
    setRowProps: () => ({
      style: { borderBottom: "10px solid #f1f7f9" },
    }),
  };
  const navigate = useNavigate();
  const handleservice = () => {
    navigate("/enquire-create");
  };
  return (
    <Layout>
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: "80vh" }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
            <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
              Enquires List
            </h3>
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse md:text-right text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md"
              onClick={handleservice}
            >
              + Add Enquires{" "}
            </button>{" "}
          </div>
          <div className="mt-5">
            <MUIDataTable
              data={enquiryData}
              columns={columns}
              options={options}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Enquires;
