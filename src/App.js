import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import SideBarMenu from "./Components/Layout/SideBarMenu";
import HeaderNav from "./Components/Layout/Header/HeaderNav";
import Footer from "./Components/Layout/Footer";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import GenerateToken from "./Components/Pages/GenerateToken";
import Scanner from "./Components/Pages/Scanner";
import TodayToken from "./Components/Pages/TodayToken";
import DisplayQueue from "./Components/Pages/DisplayQueue";
import AdminLoginPage from "./AdminPages/AdminloginPage"

function ProtectedRoutes() {

  const isAuthenticated = Cookies.get("token") !== undefined;

  console.log("Is Authenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBarMenu />
          <div className="layout-page">
            <HeaderNav />
            <div className="content-wrapper">
              <Routes>
                <Route path="/dashboard" exact element={<Dashboard />} />
                <Route path="/display-queue" exact element={<DisplayQueue />} />
                <Route
                  path="/generate-token"
                  exact
                  element={<GenerateToken />}
                />
                <Route path="/scan-token" exact element={<Scanner />} />
                <Route path="/today-token" exact element={<TodayToken />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
