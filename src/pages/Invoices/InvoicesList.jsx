import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import { MdEdit } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import moment from "moment/moment";
const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-invoice-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          setInvoices(response.data?.invoice || []);
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
      name: "invoice_date",
      label: "Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },

    {
      name: "invoice_no",
      label: "Invoices No",
      options: { filter: true, sort: false },
    },
    {
      name: "fullname",
      label: "Full Name",
      options: { filter: true, sort: false },
    },
    {
      name: "invoice_amount",
      label: "Amount",
      options: { filter: true, sort: false },
    },
    {
      name: "invoice_discount",
      label: "Discount",
      options: { filter: true, sort: false },
    },
    {
      name: "invoice_no_of_count",
      label: "No of Services",
      options: { filter: true, sort: false },
    },
    {
      name: "invoice_status",
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
          const status = tableMeta.rowData[7];

          return (
            <div className="flex items-center">
              <Tooltip title="View" placement="top">
                <IconButton component={Link} to={`/invoice-view/${id}`}>
                  <IoEyeOutline className="text-blue-600" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" placement="top">
                <IconButton
                  component={Link}
                  to={`/invoice-edit/${id}`}
                  style={{
                    display: userType == 2 ? "" : "none",
                  }}
                >
                  <MdEdit className="text-blue-600" />
                </IconButton>
              </Tooltip>
              {status === "Open" && (
                <Tooltip title="To Create Payment" placement="top">
                  <IconButton component={Link} to={`/createpayment/${id}`}>
                    <CiFileOn className="text-blue-600" />
                  </IconButton>
                </Tooltip>
              )}
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
              Invoices List
            </h3>
          </div>
          <div className="mt-5">
            <MUIDataTable data={invoices} columns={columns} options={options} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default InvoicesList;
