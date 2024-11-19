import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import BASE_URL from "../../base/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
const details_type = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Bank",
    label: "Bank",
  },
  {
    value: "NEFT",
    label: "NEFT",
  },
  {
    value: "Cheque",
    label: "Cheque",
  },
];
function CreatePayment() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  var today = new Date();
  const { id } = useParams();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;


  const [payment, setPayment] = useState({
    invoice_id: id,
    payment_date: todayback,
    payment_type: "",
    payment_amount: "",
    payment_trans: "",
    payment_remarks: "",
  });
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const onInputChange = (e) => {
    if (e.target.name == "payment_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setPayment({
          ...payment,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setPayment({
        ...payment,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    const data = new FormData();
    data.append("invoice_id", payment.invoice_id);
    data.append("payment_date", payment.payment_date);
    data.append("payment_type", payment.payment_type);
    data.append("payment_amount", payment.payment_amount);
    data.append("payment_trans", payment.payment_trans);
    data.append("payment_remarks", payment.payment_remarks);
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();
    if (v) {
      setIsButtonDisabled(true);
      axios({
        url: BASE_URL + "/api/panel-create-payment",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          toast.success("Data Inserted Sucessfully");
          navigate("/invoice");
        } else {
          toast.error("Duplicate Entry");
        }
      });
    }
  };

  return (
    <Layout>
      <Box bgcolor="#FFFFFF" p={2} borderRadius={2} mt={4}>
        <PageTitle title="Create Payment" backLink="/master-service" />

        <form id="dowRecp" autoComplete="off" onSubmit={onSubmit}>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            gap={2}
            mt={2}
          >
            <TextField
              type="date"
              label="Payment Date"
              name="payment_date"
              value={payment.payment_date}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />

            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                name="payment_type"
                value={payment.payment_type}
                onChange={(e) => onInputChange(e)}
                required
              >
                {details_type.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              name="payment_amount"
              value={payment.payment_amount}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Transaction Details"
              name="payment_trans"
              value={payment.payment_trans}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Remarks"
              name="payment_remarks"
              value={payment.payment_remarks}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
          </Box>

          <Box display="flex" gap={2} mt={3}>
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse md:text-right text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md"
              type="submit"
            >
              Submit
            </button>
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse md:text-right text-white bg-red-600 hover:bg-red-900 p-2 rounded-lg shadow-md"
              onClick={() => {
                navigate("/master-service");
              }}
            >
              Back
            </button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
}

export default CreatePayment;
