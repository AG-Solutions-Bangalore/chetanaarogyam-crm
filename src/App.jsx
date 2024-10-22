import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import DirectReferral from "./pages/referral/DirectReferral";
import SecondaryReferral from "./pages/referral/SecondReferral";
import Wallet from "./pages/wallet/wallet";
import Download from "./pages/download/download";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        {/*  Referral  */}
        <Route
          path="/direct-reffer"
          element={<ProtectedRoute element={<DirectReferral />} />}
        />
        <Route
          path="/second-reffer"
          element={<ProtectedRoute element={<SecondaryReferral />} />}
        />
        {/* //WALLET */}
        <Route
          path="/wallet"
          element={<ProtectedRoute element={<Wallet />} />}
        />
        {/* //DOENLOAD */}
        <Route
          path="/download"
          element={<ProtectedRoute element={<Download />} />}
        />

        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />
      </Routes>
    </>
  );
};

export default App;
