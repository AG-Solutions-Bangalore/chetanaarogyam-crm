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

// Unit options for dropdown
const unitOptions = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
];

const CreateInvoice = () => {
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

  const [donor, setDonor] = useState({
    invoice_date: todayback,
    invoice_year: "",
    invoice_amount: "",
    invoice_discount: "",
    invoice_no_of_count: "",
    customer_id: "",
    invoice_data: "",
    invoice_remarks: "",
  });

  const useTemplate = { invoice_sub_service: "", invoice_sub_amount: "" };
  const isAddMoreDisabled = () => {
    return users.some(
      (item) =>
        item.invoice_sub_service === "" || item.invoice_sub_amount === ""
    );
  };
  const [users, setUsers] = useState([useTemplate]);
  const [fabric_inward_count, setCount] = useState(1);
  const addItem = () => {
    setUsers([...users, useTemplate]);
    setCount(fabric_inward_count + 1);
  };

  const removeUser = (index) => {
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);
    setUsers(filteredUsers);
    setCount(fabric_inward_count - 1);
  };
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
  const [currentYear, setCurrentYear] = useState("");

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
  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      customer_id: userdata.id,
      invoice_date: todayback,
      invoice_year: currentYear,
      invoice_amount: donor.invoice_amount,
      invoice_discount: donor.invoice_discount,
      invoice_remarks: donor.invoice_remarks,
      invoice_no_of_count: fabric_inward_count,
      invoice_data: users,
    };
    var v = document.getElementById("addIndiv").checkValidity();
    var v = document.getElementById("addIndiv").reportValidity();
    e.preventDefault();

    if (v) {
      axios({
        url: BASE_URL + "/api/panel-create-invoice",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        console.log("receipt", res.data);
        toast.success("Invoices Created Sucessfully");
        navigate("/invoice");
      });
    }
  };
  const FetchCustomers = () => {
    axios({
      url: BASE_URL + "/api/panel-fetch-customers-by-id/" + id,
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
  }, []);

  return (
    <Layout>
      <Card className="p-6 mt-4">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold mb-4">
          Invoice
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <h4>
            <strong>Name :</strong> {userdata.fullname}
          </h4>
          <h4>
            <strong>Ref :</strong> {userdata.customers_ref}
          </h4>

          <h4>
            <strong>Invoice Date :</strong>{" "}
            {moment(donor.invoice_date).format("DD-MM-YYYY")}
          </h4>
          <h4>
            <strong>Year :</strong> {finalyear}
          </h4>
          <h4>
            <strong>Referred By Code :</strong> {userdata.referred_by_code}
          </h4>
        </div>
        <form id="addIndiv" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="cursor-pointer">
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
                sx={{
                  "& .MuiInputBase-root": {
                    cursor: "not-allowed",
                  },
                  "& .Mui-disabled": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </div>
            <TextField
              fullWidth
              label="Discount"
              name="invoice_discount"
              inputProps={{ maxLength: 8 }}
              value={donor.invoice_discount}
              onChange={(e) => onInputChange(e)}
              size="small"
            />
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

              <div className="flex items-center  justify-start  col-span-1 ">
                <IconButton onClick={() => removeUser(index)}>
                  <MdDelete className="text-red-600" />
                </IconButton>
              </div>
            </div>
          ))}
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md "
            onClick={addItem}
            disabled={isAddMoreDisabled()}
          >
            Add More{" "}
          </button>{" "}
          <div className="flex justify-center  mt-4 jus">
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-teal-700 p-2 rounded-lg shadow-md"
              type="submit"
            >
              Submit{" "}
            </button>{" "}
            <button
              className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-red-600 hover:bg-red-900 p-2 rounded-lg shadow-md ml-4"
              onClick={() => {
                navigate("/customer");
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

export default CreateInvoice;
