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

const Wallet = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Wallet
        </h3>
      </div>
      <div className="text-lg bg-white mt-5 rounded-lg p-4 flex justify-center font-sans font-semibold">
        Coming Soon
      </div>
    </Layout>
  );
};

export default Wallet;
