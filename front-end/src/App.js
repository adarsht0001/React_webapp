import "./App.css";
import Homepage from "./pages/user/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/user/login";
import SignupPage from "./pages/user/signup";
import ProfilePage from "./pages/user/userprofile"
import AdminLogin from "./pages/admin/adminlogin";
import Adminpanel from "./pages/admin/adminpanel";


import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/adminpanel" element={<Adminpanel/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
