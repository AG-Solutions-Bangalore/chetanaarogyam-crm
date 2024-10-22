import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import bgImg from "../../assets/rct-session-banner.png";
import toast from "react-hot-toast";
import BASE_URL from "../../base/BaseUrl";
import { useState } from "react";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const onResetPassword = (e) => {
    e.preventDefault();

    if (email !== "" && username !== "") {
      fetch(
        `${BASE_URL}/api/send-password?username=${username}&email=${email}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          toast.success("New Password Sent to your Email");
        })
        .catch((error) => {
          toast.error("Email Not sent.");
        });
    } else {
      toast.warning("Please enter a Username & Email");
    }
  };

  return (
    <div
      className="p-5 m-auto bg-cover bg-center h-[100vh] w-full flex justify-center items-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <section className="flex flex-col lg:flex-row bg-[rgba(255,255,255,0.57)] md:w-[40%] h-[600px] rounded-lg">
        <div className="flex-1 lg:w-3/5 m-4 lg:m-12 px-4 lg:px-8">
          <div className="flex justify-center">
            <div>
              <img src={Logo} alt="Logo" className="md:ml-9 mb-1" />

              <Typography
                variant="paragraph"
                color="blue-gray"
                className="md:text-lg text-sm font-normal"
              >
                Enter your email to reset your password.
              </Typography>
            </div>
          </div>
          <form
            onSubmit={onResetPassword}
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
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
                placeholder="Enter user id"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-6 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Email
              </Typography>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
               placeholder="Enter user email"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Reset Password
            </Button>

            <Typography
              variant="paragraph"
              className="text-center text-blue-gray-500 font-medium mt-4"
            >
              Remembered your password?
              <Link to="/" className="text-gray-900 ml-1">
                Sign In
              </Link>
            </Typography>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
