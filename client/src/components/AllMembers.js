import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/allmembers');
      setMembers(response.data);
    } catch (err) {
      console.error(err.message);
      toast.error("فشل في جلب الأعضاء");
    }
  };

  const handleDeactivate = async () => {
    try {
      await axios.put(`http://localhost:5000/admin/deactivate-member/${selectedMember.member_cin}`);
      setMembers(prevMembers =>
        prevMembers.map(member =>
          member.member_cin === selectedMember.member_cin ? { ...member, member_etat: false } : member
        )
      );
      toast.success("تم إلغاء تنشيط العضو بنجاح");
      handleClose();
    } catch (err) {
      console.error(err.message);
      toast.error("فشل في إلغاء تنشيط العضو");
    }
  };

  const handleClickOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className=''>
      <div className=" mr-[-120px] ">
        <AdminNav />
      </div>

      <div className="bg-white px-8 py-6 max-w-7xl mx-auto my-4 border border-[#0D3B3C] rounded-lg shadow-lg shadow-[#0D3B3C]/50" style={{ direction: 'rtl' }}>
        <h1 className="text-3xl font-bold mb-6 text-center text-[#0D3B3C]">كل الأعضاء</h1>
        {members.length > 0 ? (
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#B6B679] text-white">
                <th className="border p-3">رقم البطاقة الوطنية</th>
                <th className="border p-3">الاسم الكامل</th>
                <th className="border p-3">حالة العضو</th>
                <th className="border p-3">الدرجة</th>
                <th className="border p-3">مشرف</th>
                <th className="border p-3">البريد الإلكتروني</th>
                <th className="border p-3">تاريخ الإنشاء</th>
                <th className="border p-3">صالح من</th>
                <th className="border p-3">صالح إلى</th>
                <th className="border p-3">تحديث</th>
                <th className="border p-3">إلغاء التنشيط</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.member_cin} className="border-t">
                  <td className="border p-3 text-center">{member.member_cin}</td>
                  <td className="border p-3 text-center">{member.fullname}</td>
                  <td className="border p-3 text-center">{member.member_etat ? "نشط" : "غير نشط"}</td>
                  <td className="border p-3 text-center">{member.grade}</td>
                  <td className="border p-3 text-center">{member.admin ? "نعم" : "لا"}</td>
                  <td className="border p-3 text-center">{member.member_email}</td>
                  <td className="border p-3 text-center">{new Date(member.created_at).toLocaleString()}</td>
                  <td className="border p-3 text-center">{new Date(member.validate_from).toLocaleDateString()}</td>
                  <td className="border p-3 text-center">{new Date(member.validate_to).toLocaleDateString()}</td>
                  <td className="border p-3 text-center">
                    <Link to={`/update-member/${member.member_cin}`}>
                      <button className="bg-[#B6B679] text-white py-2 px-4 rounded hover:bg-[#0D3B3C] transition duration-300">تحديث</button>
                    </Link>
                  </td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => handleClickOpen(member)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                    >
                      إلغاء
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">لا يوجد أعضاء.</p>
        )}
      </div>

      {/* Deactivation Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="deactivate-dialog-title"
        aria-describedby="deactivate-dialog-description"
      >
        <DialogTitle id="deactivate-dialog-title">تأكيد إلغاء التنشيط</DialogTitle>
        <DialogContent>
          <DialogContentText id="deactivate-dialog-description">
            هل أنت متأكد أنك تريد إلغاء تنشيط حساب العضو {selectedMember?.fullname}؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">إلغاء</Button>
          <Button onClick={handleDeactivate} color="secondary">إلغاء التنشيط</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllMembers;
