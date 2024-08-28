// src/components/AdminDashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminNav from "./AdminNav";


const AdminDashboard = ({ setAuth }) => {
  const [adminInfo, setAdminInfo] = useState(null);

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAdminInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAdminInfo(response.data);
    } catch (err) {
      console.error(err.message);
      toast.error("فشل في جلب بيانات المسؤول");
    }
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

  return (
    <div>
      <div className="mr-[-120px] overflow-hidden">
        <AdminNav />
      </div>
      <div className="mt-8 p-6 max-w-2xl mx-auto">
  {adminInfo ? (
    <div className="bg-white p-6 border border-[#0D3B3C] rounded-lg shadow-2xl">
      <p className="mb-2 text-gray-800">
        <strong>Fullname :</strong> {adminInfo.fullname}
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Email :</strong> {adminInfo.member_email}
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Grade :</strong> {adminInfo.grade}
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Created At :</strong>{" "}
        {new Date(adminInfo.created_at).toLocaleString()}
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Validated From :</strong>{" "}
        {new Date(adminInfo.validate_from).toLocaleDateString()}
      </p>
      <p className="text-gray-800">
        <strong>Validated To :</strong>{" "}
        {new Date(adminInfo.validate_to).toLocaleDateString()}
      </p>
    </div>
  ) : (
    <p className="text-gray-500">Loading admin data...</p>
  )}
  
  <button
    onClick={logout}
    className="mt-6 bg-[#B6B679] text-white py-3 px-5 rounded-full flex items-center justify-center gap-2 hover:bg-[#0D3B3C] transition duration-300 shadow-md float-right"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H9m6 0l-3-3m3 3l-3 3M5 7v10m4-10H4a2 2 0 00-2 2v10a2 2 0 002 2h5m5 0h2a2 2 0 002-2v-4.586a1 1 0 00-.293-.707l-2-2a1 1 0 00-1.414 0l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 00-1.414 0l-2 2a1 1 0 01-.707.293H4"
      />
    </svg>
    تسجيل الخروج
  </button>
</div>

    </div>
  );
};

export default AdminDashboard;
