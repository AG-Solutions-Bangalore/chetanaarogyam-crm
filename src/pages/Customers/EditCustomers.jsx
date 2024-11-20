import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import BASE_URL from "../../base/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

function EditCustomers() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [customers, setCustomers] = useState({
    fullname: "",
    customer_status: "",
    mobile_no: "",
    email_id: "",
    address: "",
    area: "",
    interested_in: "",
    remarks: "",
  });

  const onInputChange = (e) => {
    if (e.target.name === "mobile_no") {
      if (validateOnlyDigits(e.target.value)) {
        setCustomers({
          ...customers,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setCustomers({
        ...customers,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSelectChange = (event) => {
    const { name, value } = event.target;

    setCustomers((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    axios({
      url: BASE_URL + "/api/panel-fetch-customers-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      const sanitizedData = {
        fullname: res.data.customer.fullname || "",
        customer_status: res.data.customer.customer_status || "",
        mobile_no: res.data.customer.mobile_no || "",
        email_id: res.data.customer.email_id || "",
        address: res.data.customer.address || "",
        area: res.data.customer.area || "",
        interested_in: res.data.customer.interested_in || "",
        remarks: res.data.customer.remarks || "",
      };
      setCustomers(sanitizedData);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("mobile_no", customers.mobile_no);
    data.append("customer_status", customers.customer_status);
    data.append("email_id", customers.email_id);
    data.append("address", customers.address);
    data.append("area", customers.area);
    // data.append("customer_status", services.customer_status);
    data.append("remarks", customers.remarks);
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();
    console.log(
      customers.mobile_no,
      customers.customer_status,
      customers.email_id,
      customers.address,
      customers.area,
      customers.remarks,

      "data"
    );
    if (v) {
      setIsButtonDisabled(true);
      axios({
        url: `${BASE_URL}/api/panel-update-customers/${id}?_method=PUT`,
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          toast.success("Customer Updated Sucessfully");
          navigate("/customer");
        } else {
          toast.error("Duplicate Entry");
        }
      });
    }
  };

  return (
    <Layout>
      <Box bgcolor="#FFFFFF" p={2} borderRadius={2} mt={4}>
        <PageTitle
          title="Edit Customers
"
          backLink="/customer"
        />

        <form id="dowRecp" autoComplete="off" onSubmit={onSubmit}>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            }}
            gap={2}
            mt={2}
          >
            <TextField
              label="Full Name"
              name="fullname"
              value={customers.fullname || ""}
              onChange={onInputChange}
              fullWidth
              required
              size="small"
              disabled
            />
            <TextField
              label="Mobile No"
              inputProps={{ maxLength: 10 }}
              name="mobile_no"
              value={customers.mobile_no || ""}
              onChange={onInputChange}
              fullWidth
              required
              size="small"
            />

            <TextField
              fullWidth
              required
              size="small"
              type="email"
              label="Email Id"
              name="email_id"
              value={customers.email_id || ""}
              onChange={onInputChange}
            />
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
            }}
            gap={2}
            mt={2}
          >
            <TextField
              size="small"
              fullWidth
              required
              label="Address"
              name="address"
              value={customers.address}
              onChange={onInputChange}
            />
            <TextField
              size="small"
              fullWidth
              required
              label="Area"
              name="area"
              value={customers.area}
              onChange={onInputChange}
            />
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
            }}
            gap={2}
            mt={2}
          >
            <TextField
              fullWidth
              label="Remarks"
              size="small"
              name="remarks"
              value={customers.remarks}
              onChange={onInputChange}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                id="demo-simple-select"
                value={customers.customer_status}
                name="customer_status"
                label="Status"
                onChange={handleSelectChange}
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"InActive"}>InActive</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" gap={2} mt={3} sx={{ justifyContent: "center" }}>
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md"
              type="submit"
            >
              Update
            </button>
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-red-600 hover:bg-red-900 p-2 rounded-lg shadow-md"
              onClick={() => {
                navigate("/customer");
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

export default EditCustomers;
