import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa"; // Import the arrow icon
import img from '../assets/background.jpg';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const { username, password } = inputs;
  const navigate = useNavigate();

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        body,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const { token, redirectToAdminLogin, message } = response.data;

      if (redirectToAdminLogin) {
        // Redirect to admin login page
        navigate("/admin-login");
      } else if (token) {
        localStorage.setItem("token", token);
        setAuth(true);
        toast.success("تم تسجيل الدخول بنجاح");
      } else {
        setAuth(false);
        toast.error(message || "An error occurred during login.");
      }
    } catch (err) {
      console.error(err.message);
      toast.error("فشل تسجيل الدخول. يرجى التحقق من المعلومات والمحاولة مرة أخرى.");
    }
  };

  return (
    <Fragment>
      <div
        className="flex justify-center items-center"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
        }}
      >
        <div className="w-full max-w-md p-8 border border-[#0D3B3C] rounded-lg shadow-lg shadow-[#0D3B3C]/50 bg-white relative">
          {/* Arrow icon to navigate to /login */}
          <FaArrowLeft
            onClick={() => navigate("/login")}
            className="text-[#0D3B3C] text-2xl absolute top-4 left-4 cursor-pointer hover:text-[#B6B679] transition duration-300"
          />
          <h1 className="text-3xl font-bold text-center mb-6 text-[#0D3B3C]">تسجيل دخول المسؤول</h1>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="اسم المستخدم"
              onChange={onChange}
              className="w-full p-3 mb-4 border rounded text-[#0D3B3C] placeholder-gray-500"
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="كلمة المرور"
              onChange={onChange}
              className="w-full p-3 mb-4 border rounded text-[#0D3B3C] placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#B6B679] text-white rounded hover:bg-[#0D3B3C] transition duration-300"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
