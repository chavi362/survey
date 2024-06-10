import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navigates from "./pages/Navigates";
import Login from "./pages/Login"; // Adjust the import path if necessary
import RegisterPage from "./pages/RegisterPage";
import CompleteRegistration from './pages/CompleteRegistration';
// import UserDetails from "./pages/UserDetails";
import LogOut from "./pages/LogOut";
// import { OrderProvider } from "./pages/OrderContext";
// import { UserProvider } from "./pages/UserContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navigates />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/complete-registration" component={CompleteRegistration} />
            {/* <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orderManagement" element={<OrderManagement />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/winners" element={<Winners />} />
            <Route path="/Lottery" element={<Lotteries />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
