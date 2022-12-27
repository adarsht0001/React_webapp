import "./App.css";
import Homepage from "./pages/user/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/user/login";
import SignupPage from "./pages/user/signup";
import ProfilePage from "./pages/user/userprofile";
import AdminLogin from "./pages/admin/adminlogin";
import Adminpanel from "./pages/admin/adminpanel";
import MenuAppBar from "./components/loginform/loginform";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { store } from "./redux/redux";

let persistor =persistStore(store)

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/adminpanel" element={<Adminpanel />} />
        </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
