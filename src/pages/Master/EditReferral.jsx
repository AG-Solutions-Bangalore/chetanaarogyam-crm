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

function EditReferral() {
  const [team, setTeam] = useState({
    name: "",
    full_name: "",
    mobile: "",
    email: "",
    remarks: "",
    status: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      if (validateOnlyDigits(value)) {
        setTeam({ ...team, [name]: value });
      }
    } else {
      setTeam({ ...team, [name]: value });
    }
  };

  const validateOnlyDigits = (input) => input === "" || /^\d*$/.test(input);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/panel-fetch-team-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data?.adminUser) {
          setTeam(res.data.adminUser);
        } else {
          toast.error("Unexpected response format");
        }
      })
      .catch(() => toast.error("Failed to fetch service details"));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", team.name);
    data.append("full_name", team.full_name);
    data.append("mobile", team.mobile);
    data.append("email", team.email);
    data.append("remarks", team.remarks);
    data.append("status", team.status);
    console.log(
      team.full_name,
      team.name,
      team.mobile,
      team.email,
      team.remarks,
      team.status,

      "edit ref"
    );
    if (document.getElementById("dowRecp").reportValidity()) {
      axios({
        url: `${BASE_URL}/api/panel-update-team/${id}?_method=PUT`,
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            toast.success("Service updated successfully");
            navigate("/master-referral");
          } else {
            toast.error("Duplicate entry or error updating");
          }
        })
        .catch((err) => toast.error("Failed to update service"))
        .finally(() => setIsButtonDisabled(false));
    }
  };

  return (
    <Layout>
      <Box bgcolor="#FFFFFF" p={2} borderRadius={2} mt={4}>
        <PageTitle title="Edit Referral" backLink="/master-referral" />
        <form id="dowRecp" autoComplete="off" onSubmit={onSubmit}>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
            }}
            gap={2}
            mt={2}
          >
            <TextField
              label="User Id"
              name="name"
              value={team.name}
              onChange={onInputChange}
              fullWidth
              required
              size="small"
              disabled
            />
            <TextField
              label="Full Name"
              name="full_name"
              value={team.full_name}
              onChange={onInputChange}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Mobile No"
              name="mobile"
              value={team.mobile}
              onChange={onInputChange}
              inputProps={{ maxLength: 10, minLength: 10 }}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Email Id"
              type="email"
              name="email"
              value={team.email}
              onChange={onInputChange}
              fullWidth
              required
              size="small"
            />
          </Box>
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
              label="Remarks"
              name="remarks"
              value={team.remarks}
              onChange={onInputChange}
              fullWidth
              size="small"
              sx={{
                gridColumn: {
                  // xs: "1 / -1",
                  // sm: "1 / -1",
                  md: "1 / 3",
                },
              }}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Status *</InputLabel>
              <Select
                name="status"
                label="Status"
                value={team.status}
                onChange={onInputChange}
                required
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" gap={2} mt={3} sx={{justifyContent:"center"}}>
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md"
              type="submit"
            >
              Update
            </button>
            <button
              type="button"
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-red-600 hover:bg-red-900 p-2 rounded-lg shadow-md"
              onClick={() => navigate("/master-referral")}
            >
              Back
            </button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
}

export default EditReferral;
