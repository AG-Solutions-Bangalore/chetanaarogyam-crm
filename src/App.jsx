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
import Service from "./pages/Master/Service";
import MasterReferral from "./pages/Master/Referal";
import CreateService from "./pages/Master/CreateService";
import EditService from "./pages/Master/EditServive";
import EditReferral from "./pages/Master/EditReferral";
import Enquires from "./pages/Enquires/Enquires";
import CreateEnquires from "./pages/Enquires/CreateEnquires";
import Customers from "./pages/Customers/Customers";
import EditCustomers from "./pages/Customers/EditCustomers";
import CreateCustomers from "./pages/Enquires/CreateCustomers";
import CreateInvoice from "./pages/Customers/CreateInvoice";
import InvoicesList from "./pages/Invoices/InvoicesList";
import EditInvoice from "./pages/Invoices/EditInvoice";
import CreatePayment from "./pages/Payment/CreatePayment";
import PaymentReceivedList from "./pages/Payment/PaymentReceivedlist/PaymentReceivedlist";
import EditReceivedPayment from "./pages/Payment/PaymentReceivedlist/EditReceivedPayment";
import PaymentBalancelist from "./pages/Payment/PaymentBalanced/PaymentBalanvedlist";
import InvoiceView from "./pages/Invoices/InvoiceView";

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
        {/* //master */}
        <Route path="/master-service" element={<Service />} />
        <Route path="/master-referral" element={<MasterReferral />} />
        <Route path="/master-service-create" element={<CreateService />} />
        <Route path="/master-edit/:id" element={<EditService />} />
        <Route path="/referral-edit/:id" element={<EditReferral />} />
        {/* //Enquires */}
        <Route path="/enquire" element={<Enquires />} />
        <Route path="/enquire-create" element={<CreateEnquires />} />
        <Route path="customer-add/:id" element={<CreateCustomers />} />
        {/* //customer */}
        <Route path="/customer" element={<Customers />} />
        <Route path="/customer-edit/:id" element={<EditCustomers />} />
        <Route path="/customer-invoice/:id" element={<CreateInvoice />} />
        {/* //invoice */}
        <Route path="/invoice" element={<InvoicesList />} />
        <Route path="/invoice-edit/:id" element={<EditInvoice />} />
        <Route path="/invoice-view/:id" element={<InvoiceView />} />
        {/* //payment */}
        <Route path="/createpayment/:id" element={<CreatePayment />} />
        {/* //revices */}
        <Route path="/p-receivedlist" element={<PaymentReceivedList />} />
        <Route path="/received-edit/:id" element={<EditReceivedPayment />} />
        {/* payment-balane//revices */}
        <Route path="/p-balancelist" element={<PaymentBalancelist />} />

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
