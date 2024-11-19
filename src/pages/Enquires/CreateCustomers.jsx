import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { Box, TextField, FormControl, InputLabel } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import BASE_URL from "../../base/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { toast } from "react-toastify";
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

function CreateCustomers() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentYear, setCurrentYear] = useState("");

  const [enquires, setEnquires] = useState({
    enquiresid: "",
    customers_year: currentYear,
    fullname: "",
    mobile_no: "",
    email_id: "",
    address: "",
    area: "",
    interested_in: "",
    remarks: "",
    referred_by_code: "",
    referral_code: "",
  });

  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-year`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCurrentYear(response.data.year.current_year);
        console.log(response.data.year.current_year);
      } catch (error) {
        console.error("Error fetching year data:", error);
      }
    };

    fetchYearData();
  }, []);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile_no" && !validateOnlyDigits(value)) return;
    setEnquires({ ...enquires, [name]: value });
  };
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const [service, setService] = useState([]);
  useEffect(() => {
    axios({
      url: BASE_URL + "/api/panel-fetch-enquires-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setEnquires(res.data.inquiry);
    });
  }, []);
  useEffect(() => {
    axios({
      url: BASE_URL + "/api/panel-fetch-service",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setService(res.data.service);
    });
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("enquiresid", enquires.id);
    data.append("name", enquires.fullname);
    data.append("customers_year", currentYear);
    data.append("phone", enquires.mobile_no);
    data.append("email", enquires.email_id);
    data.append("address", enquires.address);
    data.append("area", enquires.area);
    data.append("interested", enquires.interested_in);
    data.append("remarks", enquires.remarks);
    data.append("referred_by_code", enquires.referred_by_code);
    data.append("referral_code", enquires.referral_code);

    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();

    if (v) {
      setIsButtonDisabled(true);
      axios({
        url: `${BASE_URL}/api/panel-create-customers`,
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          toast.success("Data Inserted Sucessfully");
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
        <PageTitle title="Create Customers" backLink="/customer" />

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
              label="Full Name"
              name="fullname"
              value={enquires.fullname || ""}
              onChange={onInputChange}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Mobile No"
              inputProps={{ maxLength: 10 }}
              name="mobile_no"
              value={enquires.mobile_no || ""}
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
              value={enquires.email_id || ""}
              onChange={onInputChange}
            />
            <TextField
              size="small"
              fullWidth
              required
              label="Address"
              name="address"
              value={enquires.address || ""}
              onChange={onInputChange}
            />
            <TextField
              size="small"
              fullWidth
              required
              label="Area"
              name="area"
              value={enquires.area || ""}
              onChange={onInputChange}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Service</InputLabel>
              <Select
                label="Service"
                name="interested_in"
                value={enquires.interested_in || ""}
                onChange={onInputChange}
                required
              >
                {service.map((option) => (
                  <MenuItem key={option.value} value={option.service_name}>
                    {option.service_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Remarks"
              size="small"
              name="remarks"
              value={enquires.remarks || ""}
              onChange={onInputChange}
            />
            <TextField
              fullWidth
              label="Referred By Code"
              name="referred_by_code"
              size="small"
              value={enquires.referred_by_code || ""}
              onChange={onInputChange}
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
              onClick={() => navigate("/customer")}
            >
              Back
            </button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
}

export default CreateCustomers;
