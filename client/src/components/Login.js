import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
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
        className="flex justify-center items-center h-screen w-full relative"
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
        <div className="absolute inset-0"></div>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-[#0D3B3C] relative z-10">
          <h1 className="text-2xl font-bold text-center text-[#0D3B3C] mb-6">
            تسجيل الدخول
          </h1>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="الاسم الكامل"
              onChange={onChange}
              className="form-control m-2 border-2 border-gray-300 p-2 rounded w-full text-[#0D3B3C] placeholder-gray-500"
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="كلمة المرور"
              onChange={onChange}
              className="form-control m-2 border-2 border-gray-300 p-2 rounded w-full text-[#0D3B3C] placeholder-gray-500"
            />
            <button className="bg-[#B6B679] text-white p-2 w-full rounded hover:bg-[#0D3B3C] transition duration-300 mt-4">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
