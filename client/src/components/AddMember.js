import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';

const AddMember = () => {
  const [formData, setFormData] = useState({
    cin: '',
    name: '',
    etat: false,
    grade: '',
    admin: false,
    validate_from: '',
    validate_to: '',
    email: '',
    password: ''
  });

  const { cin, name, etat, grade, admin, validate_from, validate_to, email, password } = formData;

  const navigate = useNavigate(); // Initialize useNavigate

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/register', formData);
  
      if (response.data) {
        toast.success("تم تسجيل العضو بنجاح");
        navigate('/admin-dashboard'); 
      } else {
        toast.error("فشل في تسجيل العضو");
      }
      } catch (err) {
        console.error(err.message);
        toast.error("فشل في إضافة العضو");
      }
  };

  return (
    <div>
        <div className=" mr-[-120px]">
      <AdminNav />

      </div>

    <div className="bg-white px-14 py-4 max-w-3xl mx-auto my-4 border border-[#0D3B3C] rounded-lg shadow-xl shadow-[#0D3B3C]/50" style={{ direction: 'rtl' }}>
      <h1 className="text-3xl font-bold mb-8 text-center text-[#0D3B3C]">إضافة عضو</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="cin"
          placeholder="رقم البطاقة الوطنية"
          value={cin}
          onChange={onChange}
          required
          className="w-full p-3 mb-6 border rounded text-[#0D3B3C] placeholder-gray-500"
        />
        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={name}
          onChange={onChange}
          required
          className="w-full p-3 mb-6 border rounded text-[#0D3B3C] placeholder-gray-500"
        />
        <label className="inline-flex items-center mb-6 text-[#0D3B3C]">
          <input
            type="checkbox"
            name="etat"
            checked={etat}
            onChange={() => setFormData({ ...formData, etat: !etat })}
            className="form-checkbox text-[#0D3B3C] pr-3"
          />
          <span className='mr-2'>حالة العضو</span>
        </label>
        <input
          type="text"
          name="grade"
          placeholder="الدرجة"
          value={grade}
          onChange={onChange}
          required
          className="w-full p-3 mb-6 border rounded text-[#0D3B3C] placeholder-gray-500"
        />
        <label className="inline-flex items-center mb-6 text-[#0D3B3C]">
          <input
            type="checkbox"
            name="admin"
            checked={admin}
            onChange={() => setFormData({ ...formData, admin: !admin })}
            className="form-checkbox text-[#0D3B3C] p-2"
          />
          <span className='mr-2'>مشرف</span>
        </label>

        <label htmlFor="validate_from" className="block mb-2 text-[#0D3B3C] font-bold">تاريخ الصلاحية من:</label>
        <input
          type="date"
          name="validate_from"
          value={validate_from}
          onChange={onChange}
          required
          className="w-full p-3 mb-6 border rounded text-[#0D3B3C] placeholder-gray-500"
        />

        <label htmlFor="validate_to" className="block mb-2 text-[#0D3B3C] font-bold">تاريخ الصلاحية إلى:</label>
        <input
          type="date"
          name="validate_to"
          value={validate_to}
          onChange={onChange}
          required
          className="w-full p-3 mb-6 border rounded text-[#0D3B3C] placeholder-gray-500"
        />

        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={onChange}
          required
          className="w-full p-3 mb-6 border rounded text-[#0D3B3C] placeholder-gray-500"
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={onChange}
          required
          className="w-full p-3 mb-6 border rounded text-[#0D3B3C] placeholder-gray-500"
        />
        <button
          type="submit"
          className="w-full bg-[#B6B679] text-white py-3 px-5 rounded hover:bg-[#0D3B3C] transition duration-300"
        >
          إضافة عضو
        </button>
      </form>
    
    </div>
    </div>
  );
};

export default AddMember;
