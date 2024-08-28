import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Input } from "@mui/material";
import AdminNav from "./AdminNav";

const AllMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pvFile, setPvFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/allMeetings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMeetings(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMeetings();
  }, []);

  const handleMeetingClick = async (meetingId) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/meeting/${meetingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedMeeting(response.data);
      setOpenDialog(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPvFile(null);
    setUploadSuccess(false);
  };

  const handleFileChange = (e) => {
    setPvFile(e.target.files[0]);
  };

  const handleUploadPv = async () => {
    if (!pvFile || !selectedMeeting) return;

    const formData = new FormData();
    formData.append("pv", pvFile);

    try {
      const response = await axios.post(
        `http://localhost:5000/admin/meeting/${selectedMeeting.meeting_id}/upload-pv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.message) {
        setUploadSuccess(true);
        // Re-fetch the meeting details to update the PV status
        handleMeetingClick(selectedMeeting.meeting_id);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div >
      <div className="mr-[-120px] overflow-hidden">
        <AdminNav />
      </div>

      <div className="w-3/4 mx-auto p-6 text-right" style={{ direction: "rtl" }}>
        <h1 className="text-2xl font-bold mb-4">جميع الاجتماعات</h1>
        <ul>
          {meetings.map((meeting) => {
            const meetingDate = new Date(meeting.start_at);
            const isPast = meetingDate < new Date();
            return (
              <li
                key={meeting.meeting_id}
                onClick={() => handleMeetingClick(meeting.meeting_id)}
                className={`p-4 mb-2 cursor-pointer ${
                  isPast ? "bg-gray-300 text-gray-500" : "bg-white"
                } hover:bg-gray-100`}
                style={{ borderBottom: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-between">
                  <span>{meeting.title}</span>
                  <span>{meetingDate.toLocaleDateString()}</span>
                </div>
              </li>
            );
          })}
        </ul>

        
        {selectedMeeting && (
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth style={{direction:"rtl"}}>
            <DialogTitle>تفاصيل الاجتماع</DialogTitle>
            <DialogContent>
              <div><strong>العنوان:</strong> {selectedMeeting.title}</div>
              <div><strong>الموضوع:</strong> {selectedMeeting.subject}</div>
              <div><strong>المحتوى:</strong> {selectedMeeting.content}</div>
              <div><strong>تاريخ ووقت الاجتماع:</strong> {new Date(selectedMeeting.start_at).toLocaleString()}</div>
              <div><strong>المكان:</strong> {selectedMeeting.place}</div>


              {selectedMeeting.meeting_pdf_exists && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">ملف PDF الاجتماع:</h3>
                  <p>{selectedMeeting.meeting_pdf_name}</p>
                </div>
              )}

     
              {selectedMeeting.attachments_exists && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">المرفقات:</h3>
                  <p>{selectedMeeting.attachments_name}</p>
                </div>
              )}

              {selectedMeeting.pv_exists && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">PV (Rapport):</h3>
                  <p>{selectedMeeting.pv_name}</p>
                </div>
              )}


              {selectedMeeting.emails && selectedMeeting.emails.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">البريد الإلكتروني للأعضاء:</h3>
                  <ul>
                    {selectedMeeting.emails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ul>
                </div>
              )}

        
              {!selectedMeeting.pv_exists && new Date(selectedMeeting.start_at) < new Date() && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">رفع الـPV:</h3>
                  <Input type="file" onChange={handleFileChange} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUploadPv}
                    disabled={!pvFile}
                    className="mt-2"
                  >
                    رفع الـPV
                  </Button>
                  {uploadSuccess && <p className="text-green-500 mt-2">تم رفع الـPV بنجاح وإرسال البريد الإلكتروني.</p>}
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">إغلاق</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default AllMeetings;
