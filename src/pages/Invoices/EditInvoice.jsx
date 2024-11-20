import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace, MdDelete } from "react-icons/md";
import axios from "axios";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import moment from "moment/moment";
import {
  Button,
  Card,
  IconButton,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PageTitle from "../../components/PageTitle";

const status = [
  {
    value: "Open",
    label: "Open",
  },
  {
    value: "Close",
    label: "Close",
  },
];

const EditInvoice = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [userdata, setUserdata] = useState("");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;
  var d = document.getElementById("datefield");
  if (d) {
    document.getElementById("datefield").setAttribute("max", todayback);
  }

  var todayyear = new Date().getFullYear();
  var twoDigitYear = todayyear.toString().substr(-2);
  var preyear = todayyear;
  var finyear = +twoDigitYear + 1;
  var finalyear = preyear + "-" + finyear;

  const [donor, setDonor] = React.useState({
    invoice_status: "",
    invoice_amount: "",
    invoice_discount: "",
    invoice_no_of_count: "",
    invoice_date: "",
    invoice_remarks: "",
  });

  const useTemplate = {
    id: "",
    invoice_sub_service: "",
    invoice_sub_amount: "",
  };

  const [users, setUsers] = useState([useTemplate]);
  useEffect(() => {
    axios({
      url: BASE_URL + "/api/panel-fetch-invoice-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setDonor(res.data.invoice);
      setUsers(res.data.invoiceSub);
    });
  }, []);
  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onChange = (e, index) => {
    if (e.target.name == "invoice_sub_amount") {
      if (validateOnlyNumber(e.target.value)) {
        const updatedUsers = users.map((user, i) =>
          index == i
            ? Object.assign(user, { [e.target.name]: e.target.value })
            : user
        );
        setUsers(updatedUsers);
      }
    } else {
      const updatedUsers = users.map((user, i) =>
        index == i
          ? Object.assign(user, { [e.target.name]: e.target.value })
          : user
      );
      setUsers(updatedUsers);
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
  const onInputChange = (e) => {
    if (e.target.name == "invoice_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "invoice_discount") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setDonor({
        ...donor,
        [e.target.name]: e.target.value,
      });
    }
  };
  const ServiceCal = (selectedValue) => {
    const tempUsers = [...users];
    var theLoginToken = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + theLoginToken,
      },
    };
    fetch(
      BASE_URL +
        "/api/panel-fetch-service-by-value/" +
        tempUsers[selectedValue].invoice_sub_service,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        tempUsers[selectedValue].invoice_sub_amount =
          data.service.service_amount;
        setUsers(tempUsers);
      });

    const result = [];
    for (let i = 0; i < users.length; i++) {
      result.push(users[i].invoice_sub_amount);
    }
    const valu = result.reduce((acc, curr) => acc + parseInt(curr), 0);
    const total = +parseInt(valu || 0);
    setDonor((donor) => ({
      ...donor,
      invoice_amount: total,
    }));
  };
  const AmountCal = (selectedValue) => {
    const tempUsers = [...users];
    setUsers(tempUsers);
    const result = [];
    for (let i = 0; i < users.length; i++) {
      result.push(users[i].invoice_sub_amount);
    }
    const valu = result.reduce((acc, curr) => acc + parseInt(curr), 0);
    const total = +parseInt(valu || 0);
    setDonor((donor) => ({
      ...donor,
      invoice_amount: total,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      invoice_amount: donor.invoice_amount,
      invoice_discount: donor.invoice_discount,
      receipt_remarks: donor.receipt_remarks,
      invoice_no_of_count: donor.invoice_no_of_count,
      invoice_status: donor.invoice_status,
      invoice_data: users,
    };
    var v = document.getElementById("addIndiv").checkValidity();
    var v = document.getElementById("addIndiv").reportValidity();
    e.preventDefault();

    if (v) {
      axios({
        url: `${BASE_URL}/api/panel-update-invoice/${id}?_method=PUT`,
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          console.log("receipt", res.data);
          toast.success("Invoices Updated Sucessfully");
          navigate("/invoice");
        } else {
          toast.error("Duplicate Entry");
        }
      });
    }
  };
  const FetchCustomers = () => {
    axios({
      url: `${BASE_URL}/api/panel-fetch-customers-by-value/${donor.customers_ref}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setUserdata(res.data.customer);
      //   setLoader(false);
    });
  };

  const [services, setServices] = useState([]);
  const FetchServices = () => {
    var theLoginToken = localStorage.getItem("token");

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + theLoginToken,
      },
    };

    fetch(BASE_URL + "/api/panel-fetch-service", requestOptions)
      .then((response) => response.json())
      .then((data) => setServices(data.service));
  };
  useEffect(() => {
    FetchCustomers();
    FetchServices();
    fetchYearData();
  }, [donor.customers_ref]);
  const [currentYear, setCurrentYear] = useState("");
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

  return (
    <Layout>
      <PageTitle title={"Edit Invoice"} backLink={"/invoice"}></PageTitle>
      <Card className="p-6 mt-4">
        {/* <h3 className="text-center md:text-left text-lg md:text-xl font-bold mb-4">
          Invoice
        </h3> */}
        {/* <div className="grid grid-cols-1 items-center text-center md:text-left md:grid-cols-3 lg:grid-cols-5 gap-4">
          <h4>
            <strong>Name :</strong> {userdata?.fullname || "N/A"}
          </h4>
          <h4>
            <strong>Ref :</strong> {userdata?.customers_ref || ""}
          </h4>
          <h4>
            <strong>Referred By Code :</strong>{" "}
            {userdata?.referred_by_code || ""}
          </h4>
          <h4>
            <strong>Invoice Date :</strong>{" "}
            {moment(donor?.invoice_date).format("DD-MM-YYYY") || ""}
          </h4>
          <h4>
            <strong>Year :</strong> {currentYear || ""}
          </h4>
        </div> */}
        <div className="flex flex-col   items-center md:flex-row md:justify-between mb-4">
          <div>
            <p className="font-medium">
              Name:{" "}
              <span className="font-normal">{userdata?.fullname || "N/A"}</span>
            </p>
            <p className="font-medium">
              Ref :{" "}
              <span className="font-normal">
                {" "}
                {userdata?.customers_ref || ""}
              </span>
            </p>
            <p className="font-medium">
              Referred By Code :{" "}
              <span className="font-normal">
                {" "}
                {userdata?.referred_by_code || ""}
              </span>
            </p>
          </div>
          <div>
            <p className="font-medium">
              Invoice Date :{" "}
              <span className="font-normal">
                {" "}
                {moment(donor?.invoice_date).format("DD-MM-YYYY") || ""}
              </span>
            </p>
            <p className="font-medium">
              Year : <span className="font-normal"> {currentYear || ""}</span>
            </p>
          </div>
        </div>

        <form id="addIndiv" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <TextField
              label="Total Amount"
              inputProps={{ maxLength: 8 }}
              name="invoice_amount"
              value={donor.invoice_amount}
              onChange={(e) => onInputChange(e)}
              required
              disabled
              fullWidth
              size="small"
            />

            <TextField
              fullWidth
              label="Discount"
              name="invoice_discount"
              inputProps={{ maxLength: 8 }}
              value={donor.invoice_discount}
              onChange={(e) => onInputChange(e)}
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="invoice_status"
                value={donor.invoice_status}
                onChange={onInputChange}
                required
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="invoice_remarks"
              value={donor.invoice_remarks}
              onChange={(e) => onInputChange(e)}
              fullWidth
              label="Remarks"
              size="small"
            />
          </div>
          {users.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 my-4"
            >
              <div className="col-span-1  md:col-span-3 lg:col-span-4">
                <FormControl fullWidth size="small">
                  <InputLabel>Service</InputLabel>
                  <Select
                    label="Service"
                    name="invoice_sub_service"
                    value={user.invoice_sub_service}
                    onChange={(e) => {
                      onChange(e, index);
                      ServiceCal(index);
                    }}
                    required
                  >
                    {services.map((option) => (
                      <MenuItem key={option.value} value={option.service_name}>
                        {option.service_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-1 lg:col-span-2">
                <TextField
                  fullWidth
                  label="Amount"
                  required
                  name="invoice_sub_amount"
                  inputProps={{ maxLength: 8 }}
                  value={user.invoice_sub_amount}
                  onChange={(e) => {
                    onChange(e, index);
                    AmountCal(index);
                  }}
                  size="small"
                />
              </div>
            </div>
          ))}

          <div className="flex justify-center  mt-4">
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md"
              type="submit"
            >
              Update{" "}
            </button>{" "}
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md mx-2"
              onClick={() => {
                navigate("/invoice");
              }}
            >
              Back{" "}
            </button>{" "}
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default EditInvoice;
