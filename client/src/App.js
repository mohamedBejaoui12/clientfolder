import { Fragment, useEffect, useState } from "react";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Login from "./components/Login";
import Profile from "./components/Profile";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AllMembers from "./components/AllMembers";
import AddMember from "./components/AddMember";
import UpdateMember from "./components/UpdateMember";
import AddMeeting from "./components/AddMeeting";
import AllMeetings from "./components/AllMeetings";  // Import the AllMeetings component
import AdminHistory from "./components/AdminHistory";
import UpdatePassword from "./components/UpdatePassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      const res = await axios.get("http://localhost:5000/auth/is-verify", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(res.data === true);
    } catch (err) {
      console.error(err.message);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/profile" />
                )
              }
            />
            <Route
              path="/admin-login"
              element={
                !isAuthenticated ? (
                  <AdminLogin setAuth={setAuth} />
                ) : (
                  <Navigate to="/admin-dashboard" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                isAuthenticated ? (
                  <AdminDashboard setAuth={setAuth} />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/all-members"
              element={
                isAuthenticated ? (
                  <AllMembers />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/add-member"
              element={
                isAuthenticated ? (
                  <AddMember />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/update-member/:cin"
              element={
                isAuthenticated ? (
                  <UpdateMember />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/add-meeting"
              element={
                isAuthenticated ? (
                  <AddMeeting />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/allMeetings"
              element={
                isAuthenticated ? (
                  <AllMeetings />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
              <Route path="/admin/history" element={<AdminHistory />} />
              <Route path="/update-password" element={<UpdatePassword />} />

            <Route
              path="/"
              element={<Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
