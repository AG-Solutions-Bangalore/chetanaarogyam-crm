import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import BASE_URL, { baseURL } from "../base/BaseUrl";
import Fields from "../common/TextField/TextField";
import Logo from "../assets/logo.png";

const gender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const blood = [
  {
    value: "A +",
    label: "A +",
  },
  {
    value: "A -",
    label: "A -",
  },
  {
    value: "B +",
    label: "B +",
  },
  {
    value: "B -",
    label: "B -",
  },
  {
    value: "O +",
    label: "O +",
  },
  {
    value: "O -",
    label: "O -",
  },
  {
    value: "AB +",
    label: "AB +",
  },
  {
    value: "AB -",
    label: "AB -",
  },
];

const identification = [
  {
    value: "Aadhar Card",
    label: "Aadhar Card",
  },
  {
    value: "PassPort",
    label: "PassPort",
  },
  {
    value: "Pan Card",
    label: "Pan Card",
  },
];

const married = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

const mailaddress = [
  {
    value: "Residence",
    label: "Residence",
  },
  {
    value: "Office",
    label: "Office",
  },
];

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    appli_name: "",
    appli_gender: "",
    appli_mno: "",
    appli_email: "",
    f_mgotra: "",
    f_mstate: "",
    f_mdob: "",
    f_mblood: "",
    f_mqualiself: "",
    f_nativeplace: "",
    proof_iden: "",
    proof_pan: "",
    f_mannidate: "",
    f_msname: "",
    f_msmno: "",
    f_msdob: "",
    f_msblood: "",
    f_mqualispouse: "",
    married: "",
    f_mfname: "",
    f_mfmno: "",
    f_mfdob: "",
    f_moffiadd: "",
    f_moffiland: "",
    f_mofficity: "",
    f_moffipin: "",
    f_mresadd: "",
    f_mresland: "",
    f_mrescity: "",
    f_mrespin: "",
    mailaddress: "",
    f_mresibang: "",
    office_phone: "",
    org_name: "",
    org_type: "",
    org_product: "",
    whats_app: "",
    agrawal_image: "",
    upload_doc_proof: "",
    otpcode: "",
    f_motherorga: "",
    priceaga: "",
    f_mmemno: "",
    f_mintrophone: "",
    f_mintroadd: "",
    donateblood: "",
    f_mintroby: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiledoc, setSelectedFileDoc] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [topping, setTopping] = useState("5100");

  const validators = {
    digits: /^\d+$/,
    text: /^[A-Za-z ]+$/,
  };

  const validateInput = (inputtxt, type) => {
    return type === "digits"
      ? validators.digits.test(inputtxt) || inputtxt.length === 0
      : validators.text.test(inputtxt) || inputtxt === "";
  };

  const fieldsToValidate = {
    digits: [
      "appli_mno",
      "office_phone",
      "whats_app",
      "f_mfmno",
      "f_mrespin",
      "f_moffipin",
      "f_mmemno",
      "f_mintrophone",
      "f_msmno",
    ],
    text: ["appli_name", "f_mfname"],
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (fieldsToValidate.digits.includes(name)) {
      if (validateInput(value, "digits")) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else if (fieldsToValidate.text.includes(name)) {
      if (validateInput(value, "text")) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else if (name === "priceaga") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setTopping(value);
      console.log("priceaga1", value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const [gottras, setGotras] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/api/fetch-web-gotra`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGotras(res.data?.gotradata);
      });
  }, []);

  const [states, setStates] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/api/fetch-web-state`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStates(res.data?.statedata);
      });
  }, []);

  const handleSendOtp = () => {
    const data = new FormData();
    data.append("appli_mno", formData.appli_mno);
    axios({
      url: baseURL + "/api/web-registerotp",
      method: "POST",
      data,
    })
      .then((res) => {
        if (res.data.code == 200) {
          toast.success("OTP Sent to Mobile No");
          setOtpSent(true);
        } else {
          toast.warning("Failed to send OTP");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    if (selectedFile) data.append("agrawal_image", selectedFile);
    if (selectedFiledoc) data.append("upload_doc_proof", selectedFiledoc);
    try {
      const response = await axios.post(
        `${baseURL}/api/web-insert-register`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("User Created Successfully");
        navigate("/");
        if (formData.priceaga == "11100") {
          window.location = "https://easebuzz.in/quickpay/txtnulgirt";
        } else {
          window.location = "https://easebuzz.in/quickpay/cdnfsvlmyl";
        }
      } else {
        if (response.data.code == 401) {
          toast.error("Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Duplicate Entry");
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error updating User:", error);
      toast.error("Error  updating User");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className=" m-10">
      {/* Title */}

      <div className="p-6 mt-10 bg-white shadow-md rounded-lg ">
        <div className="flex mb-6">
          <img className="mr-1 w-[180px]" src={Logo} alt="Logo" />
        </div>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
            <div className="form-group ">
              <Fields
                required={true}
                types="text"
                title="Name"
                type="textField"
                autoComplete="Name"
                name="appli_name"
                onChange={(e) => onInputChange(e)}
                value={formData.appli_name}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                types="text"
                title="Gender"
                type="whatsappDropdown"
                autoComplete="Name"
                name="appli_gender"
                onChange={(e) => onInputChange(e)}
                value={formData.appli_gender}
                options={gender}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                types="text"
                title="Gotra"
                type="gotraDropdown"
                autoComplete="Name"
                name="f_mgotra"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mgotra}
                options={gottras}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                types="text"
                title="State"
                type="textField"
                autoComplete="Name"
                name="f_mstate"
                value={formData.f_mstate}
                onChange={onInputChange}
                options={states}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
            <div className="form-group ">
              <Input
                required
                type="tel"
                maxLength={10}
                label="Mobile No"
                autoComplete="Name"
                name="appli_mno"
                onChange={(e) => onInputChange(e)}
                value={formData.appli_mno}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                types="email"
                title="Email Address"
                type="textField"
                autoComplete="Name"
                name="appli_email"
                onChange={(e) => onInputChange(e)}
                value={formData.appli_email}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                label="Date of Birth"
                type="date"
                autoComplete="Name"
                name="f_mdob"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mdob}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                title="Blood Group"
                type="whatsappDropdown"
                autoComplete="Name"
                name="f_mblood"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mblood}
                options={blood}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
            <div className="form-group ">
              <Input
                required
                type="text"
                label="Qualification"
                autoComplete="Name"
                name="f_mqualiself"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mqualiself}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                title="Proof Identification"
                type="whatsappDropdown"
                autoComplete="Name"
                name="proof_iden"
                onChange={(e) => onInputChange(e)}
                value={formData.proof_iden}
                options={identification}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                label="Upload your document proof"
                type="file"
                autoComplete="Name"
                name="upload_doc_proof"
                onChange={(e) => setSelectedFileDoc(e.target.files[0])}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                label="Upload your document proof"
                type="file"
                autoComplete="Name"
                name="upload_doc_proof"
                onChange={(e) => setSelectedFileDoc(e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex justify-center p-3">
            <h1 className="text-2xl font-bold">Family Information</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
            <div className="form-group ">
              <Input
                required
                type="tel"
                maxLength={10}
                label="Pan"
                autoComplete="Name"
                name="proof_pan"
                onChange={(e) => onInputChange(e)}
                value={formData.proof_pan}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                title="Are you married"
                type="whatsappDropdown"
                autoComplete="Name"
                name="married"
                onChange={(e) => onInputChange(e)}
                value={formData.married}
                options={married}
              />
            </div>
          </div>
          {formData.married == "Yes" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
                <div className="form-group ">
                  <Input
                    type="date"
                    label="Anniversery"
                    autoComplete="Name"
                    name="f_mannidate"
                    onChange={(e) => onInputChange(e)}
                    value={formData.f_mannidate}
                  />
                </div>
                <div className="form-group ">
                  <Fields
                    required={true}
                    title="Spouse Name"
                    type="textField"
                    autoComplete="Name"
                    name="f_msname"
                    onChange={(e) => onInputChange(e)}
                    value={formData.f_msname}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="tel"
                    maxLength={10}
                    label="Spouse Mobile Number"
                    autoComplete="Name"
                    name="f_msmno"
                    onChange={(e) => onInputChange(e)}
                    value={formData.f_msmno}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="date"
                    label="Spouse's Date of Birth"
                    autoComplete="Name"
                    name="f_msdob"
                    onChange={(e) => onInputChange(e)}
                    value={formData.f_msdob}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
                <div className="form-group ">
                  <Fields
                    type="whatsappDropdown"
                    title="Spouse Blood"
                    autoComplete="Name"
                    name="f_msblood"
                    onChange={(e) => onInputChange(e)}
                    value={formData.f_msblood}
                    options={blood}
                  />
                </div>
                <div className="form-group ">
                  <Fields
                    title="Qualification (Spouse)"
                    type="textField"
                    autoComplete="Name"
                    name="f_mqualispouse"
                    onChange={(e) => onInputChange(e)}
                    value={formData.f_mqualispouse}
                  />
                </div>
              </div>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
            <div className="form-group ">
              <Input
                required
                type="text"
                label="Father Name"
                autoComplete="Name"
                name="f_mfname"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mfname}
              />
            </div>
            <div className="form-group ">
              <Input
                label="DOB"
                type="date"
                autoComplete="Name"
                name="f_mfdob"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mfdob}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                type="tel"
                label="Father's Mobile No"
                autoComplete="Name"
                name="f_mfmno"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mfmno}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                type="text"
                label="Nativeplace"
                autoComplete="Name"
                name="f_nativeplace"
                onChange={(e) => onInputChange(e)}
                value={formData.f_nativeplace}
              />
            </div>
          </div>
          <div className="flex justify-center p-3">
            <h1 className="text-2xl font-bold">Contact</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-3">
            <div className="form-group ">
              <Input
                required
                type="text"
                label="Residential Address"
                autoComplete="Name"
                name="f_mresadd"
                value={formData.f_mresadd}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
            <div className="form-group col-span-2">
              <Input
                required
                type="text"
                label="Landmark"
                autoComplete="Name"
                name="f_mresland"
                value={formData.f_mresland}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                type="text"
                label="City"
                autoComplete="Name"
                name="f_mrescity"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mrescity}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                type="tel"
                maxLength={6}
                label="Pincode"
                autoComplete="Name"
                name="f_mrespin"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mrespin}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-3">
            <div className="form-group ">
              <Input
                type="text"
                label="Office Address"
                autoComplete="Name"
                name="f_moffiadd"
                onChange={(e) => onInputChange(e)}
                value={formData.f_moffiadd}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-3">
            <div className="form-group md:col-span-2">
              <Input
                type="text"
                label="Landmark"
                autoComplete="Name"
                name="f_moffiland"
                onChange={(e) => onInputChange(e)}
                value={formData.f_moffiland}
              />
            </div>
            <div className="form-group ">
              <Input
                type="text"
                label="City"
                autoComplete="Name"
                name="f_mofficity"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mofficity}
              />
            </div>
            <div className="form-group ">
              <Input
                type="tel"
                maxLength={6}
                label="Pincode"
                autoComplete="Name"
                name="f_moffipin"
                onChange={(e) => onInputChange(e)}
                value={formData.f_moffipin}
              />
            </div>
            <div className="form-group ">
              <Input
                type="tel"
                maxLength={10}
                label="Office No"
                autoComplete="Name"
                name="office_phone"
                onChange={(e) => onInputChange(e)}
                value={formData.office_phone}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
            <div className="form-group">
              <Fields
                required={true}
                type="whatsappDropdown"
                title="Mail Address"
                autoComplete="Name"
                name="mailaddress"
                onChange={(e) => onInputChange(e)}
                value={formData.mailaddress}
                options={mailaddress}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                type="tel"
                maxLength={4}
                label="ince Resident in Bangalore (Year)"
                autoComplete="Name"
                name="f_mresibang"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mresibang}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                type="tel"
                maxLength={6}
                label="Pincode"
                autoComplete="Name"
                name="f_moffipin"
                onChange={(e) => onInputChange(e)}
                value={formData.f_moffipin}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                type="whatsappDropdown"
                title="Donate Blood"
                autoComplete="Name"
                name="donateblood"
                onChange={(e) => onInputChange(e)}
                value={formData.donateblood}
                options={married}
              />
            </div>
          </div>
          <div className="flex justify-center p-3">
            <h1 className="text-2xl font-bold">Introduction</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
            <div className="form-group">
              <Fields
                required={true}
                type="textField"
                title="Introducd By (Member Name)"
                autoComplete="Name"
                name="f_mintroby"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mintroby}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                type="tel"
                maxLength={4}
                label="Membership No. of Introducer"
                autoComplete="Name"
                name="f_mmemno"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mmemno}
              />
            </div>
            <div className="form-group ">
              <Input
                required
                type="tel"
                maxLength={10}
                label="Phone No. of Introducer"
                autoComplete="Name"
                name="f_mintrophone"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mintrophone}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
            <div className="form-group col-span-2">
              <Fields
                required={true}
                type="textField"
                title="Address of Introducer"
                autoComplete="Name"
                name="f_mintroadd"
                onChange={(e) => onInputChange(e)}
                value={formData.f_mintroadd}
              />
            </div>
            <div className="form-group ">
              <Fields
                required={true}
                type="whatsappDropdown"
                title="Member of any Other Organizations"
                autoComplete="Name"
                name="f_motherorga"
                onChange={(e) => onInputChange(e)}
                value={formData.f_motherorga}
                options={married}
              />
            </div>
          </div>
          {formData.f_motherorga == "Yes" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
              <div className="form-group ">
                <Fields
                  type="textField"
                  title="Organization Name"
                  autoComplete="Name"
                  name="org_name"
                  onChange={(e) => onInputChange(e)}
                  value={formData.org_name}
                />
              </div>
              <div className="form-group ">
                <Fields
                  type="textField"
                  title="Organization Type"
                  autoComplete="Name"
                  name="org_type"
                  onChange={(e) => onInputChange(e)}
                  value={formData.org_type}
                />
              </div>
              <div className="form-group ">
                <Fields
                  type="textField"
                  title="Organizations Product"
                  autoComplete="Name"
                  name="org_product"
                  onChange={(e) => onInputChange(e)}
                  value={formData.org_product}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3 mt-2">
            <div className="form-group ">
              <label style={{ fontSize: "16px" }}>
                <strong>Life Member</strong>
              </label>
            </div>
            <div className="form-group ">
              <label style={{ fontSize: "16px" }}>Entry Fee: 100.00</label>
            </div>
            <div className="form-group ">
              <label style={{ fontSize: "16px" }}> Membership: 5,000.00</label>
            </div>
            <div className="form-group ">
              <label>
                <input
                  type="radio"
                  name="priceaga"
                  checked={topping === "5100"}
                  onChange={(e) => onInputChange(e)}
                  value="5100"
                  defaultValue="5100"
                />{" "}
                5,100.00
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3 mt-2">
            <div className="form-group ">
              <label style={{ fontSize: "16px" }}>
                <strong>Patron Life Member</strong>
              </label>
            </div>
            <div className="form-group ">
              <label style={{ fontSize: "16px" }}>Entry Fee: 100.00</label>
            </div>
            <div className="form-group ">
              <label style={{ fontSize: "16px" }}>Membership: 11,000.00</label>
            </div>
            <div className="form-group ">
              <label>
                <input
                  type="radio"
                  name="priceaga"
                  checked={topping === "11100"}
                  value="11100"
                  onChange={(e) => onInputChange(e)}
                  defaultValue="11100"
                />{" "}
                11,100.00
              </label>
            </div>
          </div>
          {otpSent && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
              <div className="form-group ">
                <Input
                  type="number"
                  label="Enter OTP"
                  autoComplete="Name"
                  name="otpcode"
                  onChange={(e) => onInputChange(e)}
                  value={formData.otpcode}
                />
              </div>
              <div className="form-group ">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? "Submiting..." : "Submit"}
                </button>
              </div>
            </div>
          )}

          {!otpSent && (
            <div className="mt-4">
              <button
                onClick={handleSendOtp}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
