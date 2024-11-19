import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import { MdEdit } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
const Customers = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-customers-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          setEnquiryData(response.data?.customer || []);
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
      label: "Full Name",
      options: { filter: true, sort: false },
    },
    {
      name: "mobile_no",
      label: "Mobile No",
      options: { filter: true, sort: false },
    },
    {
      name: "area",
      label: "Area",
      options: { filter: true, sort: false },
    },
    {
      name: "interested_in",
      label: "Service",
      options: { filter: true, sort: false },
    },
    {
      name: "referral_code",
      label: "Referral Code",
      options: { filter: true, sort: false },
    },
    {
      name: "customer_status",
      label: "Status",
      options: { filter: true, sort: false },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id, tableMeta) => {
          const userType = localStorage.getItem("user_type_id");
          const status = tableMeta.rowData[6]; 

          return (
            <div className="flex items-center">
              {status === "Active" && (
                <Tooltip title="To Create Invoice" placement="top">
                  <IconButton
                    component={Link}
                    to={`/customer-invoice/${id}`}
                  >
                    <CiFileOn className="text-blue-600" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Edit" placement="top">
                <IconButton
                  component={Link}
                  to={`/customer-edit/${id}`}
                  style={{
                    display: userType == 3 ? "none" : "",
                  }}
                >
                  <MdEdit className="text-blue-600" />
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
              Customers List
            </h3>
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

export default Customers;
