import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button, Tooltip, IconButton, CircularProgress } from "@mui/material";
import { MdEdit } from "react-icons/md";
import Layout from "../../layout/Layout";
import Master from "../../components/Master";
import BASE_URL from "../../base/BaseUrl";

const MasterReferral = () => {
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-team-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          setServiceData(response.data?.adminUser || []);
        }
      } catch (error) {
        console.error("Error fetching Referall data", error);
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
      name: "full_name",
      label: "Full Name",
      options: { filter: true, sort: false },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: { filter: true, sort: false },
    },
    {
      name: "email",
      label: "Email",
      options: { filter: true, sort: false },
    },
    {
      name: "name",
      label: "Referal Id",
      options: { filter: true, sort: false },
    },
    {
      name: "status",
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
          const userType = localStorage.getItem("user_type_id");
          return (
            <div className="flex items-center">
              <Tooltip title="Edit" placement="top">
                <IconButton
                  disabled={userType == 3}
                  component={Link}
                  to={`/referral-edit/${id}`}
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
          <Master />
          <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
            <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
              Referral List
            </h3>
          
          </div>
          <div className="mt-5">
            <MUIDataTable
              data={serviceData}
              columns={columns}
              options={options}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default MasterReferral;
