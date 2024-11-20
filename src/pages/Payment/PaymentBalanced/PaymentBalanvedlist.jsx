import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import Layout from "../../../layout/Layout";
import BASE_URL from "../../../base/BaseUrl";
import { MdEdit } from "react-icons/md";
import Payment from "../../../components/Payment";
import { toast } from "react-toastify";
const PaymentBalancelist = () => {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-balance-payment-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          setPayment(response.data?.balance || []);
        }
      } catch (error) {
        console.error("Error fetching service data", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPaymentData();

    return () => {
      isMounted = false;
    };
  }, []);
  const updateData = (e, value) => {
    e.preventDefault();
    let data = {
      invoice_status: "Close",
    };
    axios({
      url: BASE_URL + "/api/panel-update-balance-payment-status/" + value,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      let response = res.data.balance;

      setPayment(response || []);
      toast.success("Payment Closed Sucessfully");
    });
  };
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
      name: "invoice_ref",
      label: "Balance",
      options: { filter: true, sort: false },
    },
    {
      name: "invoice_amount",
      label: "Total Amount",
      options: { filter: true, sort: false },
    },
    {
      name: "received",
      label: "Received",
      options: { filter: true, sort: false },
    },

    {
      name: "amountDifference",
      label: "Balance",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          // Fetching values from tableMeta.rowData
          const invoiceAmount = parseFloat(tableMeta.rowData[2]);
          const receivedAmount = parseFloat(tableMeta.rowData[3]);

          // Calculate the difference
          const amountDifference = invoiceAmount - receivedAmount;

          return amountDifference;
        },
      },
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
          const status = tableMeta.rowData[5];
          return (
            <div className="flex items-center">
              {status === "Open" && (
                <Tooltip title="To Close Invoice" placement="top">
                  <IconButton onClick={(e) => updateData(e, id)}>
                    <MdEdit className="text-blue-600" />
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

  return (
    <Layout>
      <Payment />
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
              Payment Balance List
            </h3>
          </div>
          <div className="mt-5">
            <MUIDataTable data={payment} columns={columns} options={options} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default PaymentBalancelist;
