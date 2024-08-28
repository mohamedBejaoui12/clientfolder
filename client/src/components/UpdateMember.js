import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';


const UpdateMember = () => {
  const { cin } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    new_cin: '',
    fullname: '',
    member_etat: false,
    grade: '',
    admin: false,
    validate_from: '',
    validate_to: '',
    member_email: '',
    member_pass: ''
  });

  const fetchMember = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/update/${cin}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setFormData({ ...response.data, new_cin: response.data.member_cin });
    } catch (err) {
      console.error(err.message);
      toast.error("فشل في جلب تفاصيل العضو");
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Add this line to check form data
    try {
      await axios.put(`http://localhost:5000/admin/update/${cin}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("تم تحديث العضو بنجاح");
      navigate('/all-members');
    } catch (err) {
      console.error(err.message);
      toast.error("فشل في تحديث العضو");
    }
  };
  

  return (
    <div>
       <div className=" mr-[-120px]">
      <AdminNav />

      </div>

     <div className="bg-white px-8 py-6 max-w-4xl mx-auto my-4 border border-[#0D3B3C] rounded-lg shadow-lg shadow-[#0D3B3C]/50" style={{ direction: 'rtl' }}>
      <h1 className="text-3xl font-bold mb-6 text-center text-[#0D3B3C]">تحديث العضو</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-[#0D3B3C] mb-1">رقم البطاقة الوطنية:</label>
          <input
            type="text"
            name="new_cin"
            placeholder="رقم البطاقة الوطنية"
            value={formData.new_cin}
            onChange={onChange}
            required
            className="w-full p-2 border border-[#B6B679] rounded"
          />
        </div>
        <div>
          <label className="block text-[#0D3B3C] mb-1">الاسم الكامل:</label>
          <input
            type="text"
            name="fullname"
            placeholder="الاسم الكامل"
            value={formData.fullname}
            onChange={onChange}
            required
            className="w-full p-2 border border-[#B6B679] rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="member_etat"
            checked={formData.member_etat}
            onChange={() => setFormData({ ...formData, member_etat: !formData.member_etat })}
            className="mr-2"
          />
          <label className="text-[#0D3B3C]">حالة العضو</label>
        </div>
        <div>
          <label className="block text-[#0D3B3C] mb-1">الدرجة:</label>
          <input
            type="text"
            name="grade"
            placeholder="الدرجة"
            value={formData.grade}
            onChange={onChange}
            required
            className="w-full p-2 border border-[#B6B679] rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="admin"
            checked={formData.admin}
            onChange={() => setFormData({ ...formData, admin: !formData.admin })}
            className="mr-2"
          />
          <label className="text-[#0D3B3C]">مشرف</label>
        </div>
        <div>
          <label className="block text-[#0D3B3C] mb-1">صالح من:</label>
          <input
            type="date"
            name="validate_from"
            value={formData.validate_from}
            onChange={onChange}
            required
            className="w-full p-2 border border-[#B6B679] rounded"
          />
        </div>
        <div>
          <label className="block text-[#0D3B3C] mb-1">صالح إلى:</label>
          <input
            type="date"
            name="validate_to"
            value={formData.validate_to}
            onChange={onChange}
            required
            className="w-full p-2 border border-[#B6B679] rounded"
          />
        </div>
        <div>
          <label className="block text-[#0D3B3C] mb-1">البريد الإلكتروني:</label>
          <input
            type="email"
            name="member_email"
            placeholder="البريد الإلكتروني"
            value={formData.member_email}
            onChange={onChange}
            required
            className="w-full p-2 border border-[#B6B679] rounded"
          />
        </div>
        <div>
          <label className="block text-[#0D3B3C] mb-1">كلمة المرور:</label>
          <input
            type="password"
            name="member_pass"
            placeholder="كلمة المرور"
            value={formData.member_pass}
            onChange={onChange}
            required
            className="w-full p-2 border border-[#B6B679] rounded"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-[#B6B679] text-white rounded hover:bg-[#0D3B3C] transition duration-300">
          تحديث العضو
        </button>
      </form>
     
    </div> 
    </div>

    
    
  );
};

export default UpdateMember;
