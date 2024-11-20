import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import BASE_URL from "../../base/BaseUrl";
import { useNavigate } from "react-router-dom";

function CreateService() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const [services, setService] = useState({
    service_name: "",
    service_amount: "",
  });
  const onInputChange = (e) => {
    if (e.target.name == "service_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setService({
          ...services,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setService({
        ...services,
        [e.target.name]: e.target.value,
      });
    }
  };
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = (e) => {
    const data = new FormData();
    data.append("service_name", services.service_name);
    data.append("service_amount", services.service_amount);
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();
    console.log(services.service_name, "", services.service_amount, "data");
    if (v) {
      setIsButtonDisabled(true);
      axios({
        url: BASE_URL + "/api/panel-create-service",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          toast.success("Servives Created Sucessfully");
          navigate("/master-service");
        } else {
          toast.error("Duplicate Entry");
        }
      });
    }
  };

  return (
    <Layout>
      <Box bgcolor="#FFFFFF" p={2} borderRadius={2} mt={4}>
        <PageTitle title="Create Service" backLink="/master-service" />

        <form id="dowRecp" autoComplete="off" onSubmit={onSubmit}>
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
              label="Service"
              name="service_name"
              value={services.service_name}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Amount"
              inputProps={{ maxLength: 10 }}
              name="service_amount"
              value={services.service_amount}
              onChange={(e) => onInputChange(e)}
              fullWidth
              required
              size="small"
            />
          </Box>

          <Box display="flex " gap={2} mt={3} sx={{ justifyContent: "center" }}>
            <button
              className="text-center  text-sm font-[400] cursor-pointer hover:animate-pulse  text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md w-36"
              type="submit"
            >
              Submit
            </button>
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse md:text-right text-white bg-red-600 hover:bg-red-900 p-2 rounded-lg shadow-md  w-36"
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

export default CreateService;
