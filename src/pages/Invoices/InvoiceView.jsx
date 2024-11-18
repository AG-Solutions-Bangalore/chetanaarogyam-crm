import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { LuDownload } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import PageTitle from "../../components/PageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableFooter from "@mui/material/TableFooter";

function InvoiceView() {
  const [theId, setTheId] = useState(0);
  const [customer, setCustomer] = useState([]);
  const [invoices, setInvoices] = useState({});
  const [invoicesSub, setInvoicesSub] = useState({});
  const { id } = useParams();
  useEffect(() => {
    setTheId(id);

    axios({
      url: BASE_URL + "/api/panel-fetch-invoice-by-view/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setInvoices(res.data.invoice);
      setInvoicesSub(res.data.invoiceSub);
      setCustomer(res.data.customer);
      setLoader(false);
    });
  }, []);
  const sendEmail = (e) => {
    e.preventDefault();
    axios({
      url: BASE_URL + "/api/panel-send-invoice?id=" + theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Email Sent Sucessfully");
      } else {
        toast.error("Email Not Sent Sucessfully");
      }
    });
  };

  const downloadReceipt = (e) => {
    e.preventDefault();
    axios({
      url: BASE_URL + "/api/panel-download-invoice?id=" + theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        toast.success("Invoice Downloaded Sucessfully");
      })
      .catch((err) => {
        toast.error("Invoice Not Downloaded");
      });
  };

  return (
    <Layout>
      <div className="mt-3">
        <PageTitle title={"Invoice View "} backLink={"/invoice"}></PageTitle>
        <div className="flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0 md:space-x-4 p-3">
          <button
            variant="text"
            className="flex items-center space-x-2"
            onClick={downloadReceipt}
            style={{
              display: localStorage.getItem("user_type_id") == 4 ? "none" : "",
            }}
          >
            <LuDownload className="text-lg" />
            <span>Download</span>
          </button>

          {/* Email Handling Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <a
              onClick={(e) => sendEmail(e)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <MdOutlineEmail size={20} />
              <span>Email</span>
            </a>
            <small style={{ fontSize: "10px" }}>
              Email Sent {invoices.invoice_email_count || 0} Times
            </small>
          </div>

          <button variant="text" className="flex items-center space-x-2">
            <IoMdPrint />
            <span>Print Receipt</span>
          </button>
        </div>
        <hr></hr>

        <div className="flex flex-col items-center justify-center min-h-screen md:mx-16 p-4 bg-white mt-4">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold uppercase">
              Chetana Arogyam Naturopathy Center
            </h1>
            <h2 className="text-lg font-medium">
              A Unit of Acharya Sri Tulsi Mahapragya Seva Kendra Charitable
              Trust (R)
            </h2>
            <h3 className="text-sm text-gray-600">
              #51/1123rd K.M Milestone Opp Pepsi Gate Kumbalagudu Mysore Road
              560074
            </h3>
          </div>

          <div className="w-full max-w-4xl  p-4 ">
            {/* Client Details */}
            <div className="flex flex-col   items-center md:flex-row md:justify-between mb-4">
              <div>
                <p className="font-medium">Name:</p>
                {customer.fullname}
                <p className="font-medium">Contact Number:</p>
                {customer.mobile_no}
              </div>
              <div>
                <p className="font-medium">Address:</p> {customer.address}
                <p className="font-medium">Intersted In:</p>{" "}
                {customer.interested_in}
              </div>
            </div>

            <TableContainer
              component={Paper}
              elevation={0}
              className="shadow-none"
            >
              <Table className="table-auto border-collapse border border-gray-300">
                <TableHead className="bg-gray-100">
                  <TableRow>
                    <TableCell className="text-center font-bold border border-gray-300">
                      Treatment Name
                    </TableCell>
                    <TableCell className="text-center font-bold border border-gray-300">
                      Qty
                    </TableCell>
                    <TableCell className="text-center font-bold border border-gray-300">
                      Price
                    </TableCell>
                    <TableCell className="text-center font-bold border border-gray-300">
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    "Consultation Fee of Doctor",
                    "Full Body Massage",
                    "Partial Body Massage (Head/Leg/Back/Chest)",
                    "Vibro Massage",
                    "Drainage Therapy",
                    "Rejuvenating Therapy",
                    "Lymphatic Drainage Therapy",
                    "Suna Bath",
                    "Steam Bath",
                    "Hip, Arm, and Foot Bath, Reclined Spinal Spray, Spinal Spray",
                    "Neutral Immersion Bath with Epson Salt",
                    "Colon Hydrotherapy",
                    "Underwater Therapy",
                    "Jacuzzi, Mud Bath, Mud Pack, Ion Foot Detoxifier",
                    "Acupuncture",
                  ].map((treatment, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300">
                        {treatment}
                      </TableCell>
                      <TableCell className="text-center border border-gray-300"></TableCell>
                      <TableCell className="text-center border border-gray-300"></TableCell>
                      <TableCell className="text-center border border-gray-300"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="border border-gray-300" />

                    <TableCell className="border-t font-bold text-right ">
                      Total
                    </TableCell>
                    <TableCell className="border-t font-bold text-center bg-gray-400">
                      Nil
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border border-gray-300" />

                    <TableCell className="border-t text-lg font-bold">
                      Discount
                    </TableCell>
                    <TableCell className="border-t font-bold text-center bg-gray-400">
                      ---
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="border border-gray-300" />

                    <TableCell className="border-t font-bold text-right">
                      Grand Total
                    </TableCell>
                    <TableCell className="border-t font-bold text-center bg-gray-400">
                      ---
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>

            {/* Totals Section */}
            {/* <div className="mt-4">
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold">---</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Discount</span>
                <span className="font-bold">---</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Grand Total</span>
                <span className="font-bold">---</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default InvoiceView;
