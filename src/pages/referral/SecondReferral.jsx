import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import {
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Edit, Visibility } from "@mui/icons-material";
import toast from "react-hot-toast";
import moment from "moment";
import { ContextPanel } from "../../utils/ContextPanel";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Referal from "../../components/Referal";

const SecondaryReferral = () => {
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-second-reffer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = response.data?.secondReffer;
        let tempRows = [];
        for (let i = 0; i < res.length; i++) {
          tempRows.push([
            i + 1,
            res[i]["purchs"],
            res[i]["name"],
            res[i]["full_name"],
          ]);
        }
        setReferralData(tempRows);
      } catch (error) {
        console.error("Error fetching Catagory data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "#",
      label: "#",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Reffer By",
      label: "Reffer By",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Referral Id",
      label: "Referral Id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Full Name",
      label: "Full Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: "id",
    //   label: "View",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (id, value) => {
    //       return (
    //         <div className="flex items-center space-x-2">
    //           <Tooltip title="View" placement="top">
    //             <IconButton aria-label="View">
    //               <Link to={"view?id=" + value}>
    //                 <Visibility />
    //               </Link>
    //             </IconButton>
    //           </Tooltip>
    //         </div>
    //       );
    //     },
    //   },
    // },
  ];
  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    setRowProps: (rowData) => {
      return {
        style: {
          borderBottom: "10px solid #f1f7f9",
        },
      };
    },
  };
  const usertype = localStorage.getItem("user_type_id");

  return (
    <Layout>
      {loading && (
        <CircularProgress
          disableShrink
          style={{
            marginLeft: "600px",
            marginTop: "300px",
            marginBottom: "300px",
          }}
          color="secondary"
        />
      )}
      <Referal />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Second Referral List
        </h3>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={referralData ? referralData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default SecondaryReferral;
