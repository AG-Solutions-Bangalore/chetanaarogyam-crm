import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
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
import PageTitle from "../../components/PageTitle";
import BASE_URL from "../../base/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

function EditService() {
  const [services, setService] = useState({
    service_name: "",
    service_status: "",
    service_amount: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "service_amount" && !validateOnlyDigits(value)) return;
    setService({ ...services, [name]: value });
  };

  const validateOnlyDigits = (input) => /^\d*$/.test(input);

  useEffect(() => {
    axios({
      url: `${BASE_URL}/api/panel-fetch-service-by-id/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setService(res.data.service))
      .catch((err) => toast.error("Failed to fetch service details"));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("service_name", services.service_name);
    data.append("service_amount", services.service_amount);
    data.append("service_status", services.service_status);
    console.log(
      services.service_name,
      services.service_amount,
      services.service_status,
      "edit"
    );
    // if (document.getElementById("dowRecp").reportValidity()) {
    //   setIsButtonDisabled(true);
    //   axios({
    //     url: `${BASE_URL}/api/panel-create-service`,
    //     method: "POST",
    //     data,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   })
    //     .then((res) => {
    //       if (res.data.code === "200") {
    //         toast.success("Service updated successfully");
    //         navigate("/master-service");
    //       } else {
    //         toast.error("Duplicate entry or error updating");
    //       }
    //     })
    //     .catch((err) => toast.error("Failed to update service"))
    //     .finally(() => setIsButtonDisabled(false));
    // }
  };

  return (
    <Layout>
      <Box bgcolor="#FFFFFF" p={2} borderRadius={2} mt={4}>
        <PageTitle title="Edit Service" backLink="/master-service" />

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
              label="Service"
              name="service_name"
              value={services.service_name}
              onChange={onInputChange}
              fullWidth
              required
              size="small"
              disabled
            />
            <TextField
              label="Amount"
              name="service_amount"
              value={services.service_amount}
              onChange={onInputChange}
              fullWidth
              required
              size="small"
              inputProps={{ maxLength: 10 }}
              disabled
            />
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="service_status"
                value={services.service_status}
                onChange={onInputChange}
                required
                sx={{ marginTop: "6px" }}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" gap={2} mt={3}>
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse md:text-right text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md"
              type="submit"
            >
              Update
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

export default EditService;
