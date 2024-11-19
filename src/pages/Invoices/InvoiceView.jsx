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
import ReactToPrint from "react-to-print";
import { useRef } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TableFooter from "@mui/material/TableFooter";

function InvoiceView() {
  const [theId, setTheId] = useState(0);
  const [customer, setCustomer] = useState([]);
  const [invoices, setInvoices] = useState({});
  const [invoicesSub, setInvoicesSub] = useState([]);
  const { id } = useParams();
  const componentRef = useRef();
  const tableRef = useRef(null);

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

  const handleSavePDF = () => {
    const input = tableRef.current;

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const margin = 20;

        const availableWidth = pdfWidth - 2 * margin;

        const ratio = Math.min(
          availableWidth / imgWidth,
          pdfHeight / imgHeight
        );

        const imgX = margin;
        const imgY = 0;

        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("invoice.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF: ", error);
      });
  };

  const mergeRefs =
    (...refs) =>
    (node) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
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
            onClick={handleSavePDF}
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
          <ReactToPrint
            trigger={() => (
              <button variant="text" className="flex items-center space-x-2">
                <IoMdPrint />
                <span>Print Receipt</span>
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
        <hr></hr>

        <div
          className="flex flex-col items-center  min-h-screen md:mx-16 p-4 bg-white "
          ref={mergeRefs(componentRef, tableRef)}
        >
          <div className="text-center mb-6 mt-5">
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
                <p className="font-medium">
                  Name: <span className="font-normal">{customer.fullname}</span>
                </p>
                <p className="font-medium">
                  Address:{" "}
                  <span className="font-normal"> {customer.address}</span>
                </p>
              </div>
              <div>
                <p className="font-medium">
                  Contact Number:{" "}
                  <span className="font-normal"> {customer.mobile_no}</span>
                </p>
                <p className="font-medium">
                  {/* Contact Number:{" "}
                  <span className="font-normal"> {customer.mobile_no}</span> */}
                </p>
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
                      Servives
                    </TableCell>
                    {/* <TableCell className="text-center font-bold border border-gray-300">
                      Amount
                    </TableCell> */}
                    {/* <TableCell className="text-center font-bold border border-gray-300">
                      Price
                    </TableCell> */}
                    <TableCell className="text-center font-bold border border-gray-300">
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoicesSub.map((treatment, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300">
                        {treatment.invoice_sub_service}
                      </TableCell>
                      {/* <TableCell className="text-center border border-gray-300">
                        {" "}
                        {treatment.invoice_sub_amount}{" "}
                      </TableCell> */}
                      {/* <TableCell className="text-center border border-gray-300"></TableCell> */}
                      <TableCell className="text-center border border-gray-300">
                        {" "}
                        {treatment.invoice_sub_amount}{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    {/* <TableCell colSpan={1} className="border border-gray-300" /> */}

                    <TableCell
                      className="border-t  font-bold bg-gray-100"
                      sx={{
                        textAlign: "right",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "black",
                      }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      className="border-t  font-bold text-center "
                      sx={{
                        fontWeight: 700,
                        fontSize: "15px",
                      }}
                    >
                      {invoices.invoice_amount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell colSpan={1} className="border border-gray-100" /> */}

                    <TableCell
                      className="border-t text-lg font-bold bg-gray-100"
                      sx={{
                        textAlign: "right",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "black",
                      }}
                    >
                      Discount
                    </TableCell>
                    <TableCell
                      className="border-t font-bold text-center "
                      sx={{
                        fontWeight: 700,
                        fontSize: "15px",
                      }}
                    >
                      {invoices.invoice_discount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell colSpan={1} className="border border-gray-100" /> */}

                    <TableCell
                      className="border-t font-bold text-right bg-gray-100"
                      sx={{
                        textAlign: "right",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "black",
                      }}
                    >
                      Grand Total
                    </TableCell>
                    <TableCell
                      className="border-t font-bold text-center "
                      sx={{
                        fontWeight: 700,
                        fontSize: "15px",
                      }}
                    >
                      {invoices.invoice_amount - invoices.invoice_discount}
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
