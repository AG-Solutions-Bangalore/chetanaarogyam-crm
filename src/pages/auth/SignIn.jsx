import { Input, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../assets/logo1.png";
import bgImg from "../../assets/rct-session-banner.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    setLoading(true);

    //create a formData object and append state values
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      // Send POST request to login API with form data
      const res = await axios.post(`${BASE_URL}/api/panel-login`, formData);

      if (res.status === 200) {
        console.log(res);
        const token = res.data.UserInfo?.token;
        const id = res.data.UserInfo?.user.user_type;
        localStorage.setItem("id", id);
        const name = res.data.UserInfo?.user.name;
        const user_type = res.data.UserInfo?.user.user_type;
        const full_name = res.data.UserInfo?.user.full_name;

        localStorage.setItem("username", name);
        localStorage.setItem("user_type_id", user_type);
        localStorage.setItem("full_name", full_name);
        if (token) {
          localStorage.setItem("token", token);
          navigate("/home");
        } else {
          toast.error("Login Failed, Token not received.");
        }
      } else {
        toast.error("Login Failed, Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }

    setLoading(false);
  };
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <div
        className="p-5 m-auto  bg-cover bg-center h-[100vh] w-full flex justify-center items-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <section className=" flex-col lg:flex-row bg-[rgba(255,255,255,0.57)] md:w-[40%] w-full md:h-[600px] h-[550px] rounded-lg">
          <div className="flex-1  m-4   px-4 lg:px-2">
            <div className="flex justify-center">
              <div>
                <img src={Logo} alt="Logo" className="md:ml-9 mb-1" />

                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="md:text-lg text-sm font-normal"
                >
                  Enter your email and password to Sign In.
                </Typography>
              </div>
            </div>
            <form
              onSubmit={handleSumbit}
              method="POST"
              className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4"
            >
              <div className="mb-6 flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  User Id
                </Typography>
                <Input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  placeholder="Enter user id"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Password
                </Typography>
                <Input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              {/* <Button
                type="sumbit"
                disabled={loading}
                className="mt-6"
                fullWidth
              >
                {loading ? "Checking..." : "Sign In"}
              </Button> */}
              <div className="flex items-center justify-center">
                <button
                  className=" text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
                  type="sumbit"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? "Checking..." : "Sign In"}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                <Typography
                  variant="small"
                  className="font-medium text-gray-900 hover:text-red-700"
                >
                  <Link to="/forget-password">Forgot Password</Link>
                </Typography>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignIn;
