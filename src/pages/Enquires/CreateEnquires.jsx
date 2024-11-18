import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import BASE_URL from "../../base/BaseUrl";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

function CreateEnquires() {
  const navigate = useNavigate();

  const [enquires, setEnquires] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    interested: "",
    remark: "",
    referred_by_code: "",
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
    if (e.target.name == "phone") {
      if (validateOnlyDigits(e.target.value)) {
        setEnquires({
          ...enquires,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setEnquires({
        ...enquires,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    const data = new FormData();
    data.append("name", enquires.name);
    data.append("phone", enquires.phone);
    data.append("email", enquires.email);
    data.append("address", enquires.address);
    data.append("area", enquires.area);
    data.append("interested", enquires.interested);
    data.append("remark", enquires.remark);
    data.append("referred_by_code", enquires.referred_by_code);
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();
    console.log(
      enquires.name,
      "",
      enquires.phone,
      enquires.email,
      enquires.address,
      enquires.area,
      enquires.interested,
      enquires.referred_by_code,
      enquires.remark,
      "data"
    );
    if (v) {
      axios({
        url: BASE_URL + "/api/panel-create-enquires",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          toast.success("Data Inserted Sucessfully");
        } else {
          toast.error("Duplicate Entry");
        }
      });
    }
  };
  const [service, setService] = useState([]);
  useEffect(() => {
    var theLoginToken = localStorage.getItem("token");

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + theLoginToken,
      },
    };

    fetch(BASE_URL + "/api/panel-fetch-service", requestOptions)
      .then((response) => response.json())
      .then((data) => setService(data.service));
  }, []);
  return (
    <Layout>
      <Box bgcolor="#FFFFFF" p={2} borderRadius={2} mt={4}>
        <PageTitle title="Create Enquire" backLink="/enquire" />

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
              name="name"
              value={enquires.name}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Mobile No"
              inputProps={{ maxLength: 10 }}
              onChange={(e) => onInputChange(e)}
              name="phone"
              value={enquires.phone}
              fullWidth
              required
              size="small"
            />
            <TextField
              type="email"
              label="Email Id"
              name="email"
              value={enquires.email}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Address"
              name="address"
              value={enquires.address}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Area"
              name="area"
              value={enquires.area}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
            {/* <FormControl fullWidth size="small">
              <InputLabel>Service</InputLabel>
              <Select
                name="interested"
                label="Service"
                value={enquires.interested}
                onChange={(e) => onInputChange(e)}
                required
                sx={{ marginTop: "6px" }}
              >
                {service.map((option) => (
                  <MenuItem key={option.value} value={option.service_name}>
                    {option.service_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <FormControl fullWidth size="small">
              <InputLabel>Service</InputLabel>
              <Select
                label="Service"
                name="interested"
                value={enquires.interested || ""}
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
              label="Referred By Code"
              name="referred_by_code"
              value={enquires.referred_by_code}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Remark"
              name="remark"
              value={enquires.remark}
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
                navigate("/enquire");
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

export default CreateEnquires;
