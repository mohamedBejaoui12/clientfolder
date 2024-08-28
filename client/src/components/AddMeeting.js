import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router-dom';


const AddMeeting = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    subject: "",
    content: "",
    start_at: "",
    place: ""
  });

  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [meetingPdf, setMeetingPdf] = useState(null);
  const [attachments, setAttachments] = useState(null);

  const { title, subject, content, start_at, place } = inputs;

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/fetch-emails", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEmails(response.data.emails);
      } catch (err) {
        console.error(err.message);
        toast.error("Failed to fetch emails");
      }
    };

    fetchEmails();
  }, []);

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    if (e.target.name === "meeting_pdf") {
      setMeetingPdf(e.target.files[0]);
    } else if (e.target.name === "attachments") {
      setAttachments(e.target.files[0]);
    }
  };

  const onEmailChange = (e) => {
    const email = e.target.value;
    if (e.target.checked) {
      setSelectedEmails([...selectedEmails, email]);
    } else {
      setSelectedEmails(selectedEmails.filter((selectedEmail) => selectedEmail !== email));
    }
  };

  const onSelectAllEmails = () => {
    setSelectedEmails(emails);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("content", content);
      formData.append("start_at", start_at);
      formData.append("place", place);
      formData.append("emails", JSON.stringify(selectedEmails));
      if (meetingPdf) formData.append("meeting_pdf", meetingPdf);
      if (attachments) formData.append("attachments", attachments);

      const response = await axios.post(
        "http://localhost:5000/admin/addMeeting",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        toast.success("تم إضافة الاجتماع بنجاح");
        navigate('/allMeetings');
      } else {
        toast.error("فشل في إضافة الاجتماع");
      }
    } catch (err) {
      console.error(err.message);
      toast.error("حدث خطأ أثناء إضافة الاجتماع");
    }
  };

  return (
    <div>
      <div className="mr-[-120px] mb-8 overflow-hidden">
        <AdminNav />
      </div>

      <form
        onSubmit={onSubmitForm}
        className="w-3/4 mx-auto text-right p-6 border border-[#0D3B3C] rounded-lg shadow-lg"
        style={{ direction: "rtl" }}
      >
        <h2 className="text-3xl font-bold mb-6">إضافة اجتماع</h2>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="عنوان الاجتماع"
          className="w-full mb-4 p-2 border border-[#0D3B3C] rounded shadow-sm"
        />
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={onChange}
          placeholder="موضوع الاجتماع"
          className="w-full mb-4 p-2 border border-[#0D3B3C] rounded shadow-sm"
        />
        <textarea
          name="content"
          value={content}
          onChange={onChange}
          placeholder="محتوى الاجتماع"
          className="w-full mb-2 p-2 border border-[#0D3B3C] rounded shadow-sm"
          rows={5}
        />
        <label>
          <div className="mb-2">تاريخ ووقت الاجتماع</div>
          <input
            type="datetime-local"
            name="start_at"
            value={start_at}
            onChange={onChange}
            className="w-full mb-4 p-2 border border-[#0D3B3C] rounded shadow-sm"
          />
        </label>
        <input
          type="text"
          name="place"
          value={place}
          onChange={onChange}
          placeholder="مكان اللقاء"
          className="w-full mb-4 p-2 border border-[#0D3B3C] rounded shadow-sm"
        />

     

        <div className="mb-4">
          <h3 className="font-bold">إرسال إلى البريد الإلكتروني:</h3>
          <div className="mt-4 p-4 border h-[120px] border-[#0D3B3C] rounded shadow-sm overflow-y-scroll">
            {emails.map((email) => (
              <div key={email} className="my-1">
                <input
                  type="checkbox"
                  value={email}
                  onChange={onEmailChange}
                  checked={selectedEmails.includes(email)}
                />
                <span className="mr-2">
                   {email}
                </span>
               
              </div>
            ))}
            
          </div>
        <button
          type="button"
          onClick={onSelectAllEmails}
          className="mb-4 mt-4 bg-[#B6B679] text-white py-2 px-4 rounded hover:bg-[#0D3B3C] transition duration-300 shadow-sm"
        >
          تحديد الكل  
        </button>
          
        </div>
        <label>
          ملف الاجتماع (PDF):
          <input
            type="file"
            name="meeting_pdf"
            accept="application/pdf"
            onChange={onFileChange}
            className="w-full mb-4 p-2 border border-[#0D3B3C] rounded shadow-sm"
          />
        </label>
        <label>
          مرفقات أخرى:
          <input
            type="file"
            name="attachments"
            accept="*/*"
            onChange={onFileChange}
            className="w-full mb-4 p-2 border border-[#0D3B3C] rounded shadow-sm"
          />
        </label>
      
        <button
          type="submit"
          className="w-full bg-[#B6B679] text-white py-2 px-4 rounded hover:bg-[#0D3B3C] transition duration-300 shadow-sm"
        >
          إضافة اجتماع
        </button>
      </form>
    </div>
  );
};

export default AddMeeting;
