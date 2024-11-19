import React from "react";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";

const Download = () => {
  const onSubmit = (e) => {
    e.preventDefault();

    axios({
      url: BASE_URL + "/api/panel-download-first-reffer",
      method: "POST",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "firstReferral_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("First Referral is Downloaded Successfully");
      })
      .catch((err) => {
        toast.error("First Referral is Not Downloaded");
      });
  };

  const onSubmita = (e) => {
    e.preventDefault();

    axios({
      url: BASE_URL + "/api/panel-download-second-reffer",
      method: "POST",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "secondReferral_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Second Referral is Downloaded Successfully");
      })
      .catch((err) => {
        toast.error("Second Referral is Not Downloaded");
      });
  };
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg gap-4">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold ">
          Download Referral
        </h3>
      </div>
      <div className="text-lg bg-white mt-5 rounded-lg p-4  font-sans font-semibold flex flex-col md:flex-row  items-center gap-4">
        <button
          className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse md:text-right text-white bg-blue-600 hover:bg-blue-400 p-2 rounded-lg shadow-md"
          onClick={onSubmit}
        >
          Download Direct Referral
        </button>
        <button
          className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse md:text-right text-white bg-blue-600 hover:bg-blue-400 p-2 rounded-lg shadow-md"
          onClick={onSubmita}
        >
          Download Second Referral
        </button>
      </div>
    </Layout>
  );
};

export default Download;
