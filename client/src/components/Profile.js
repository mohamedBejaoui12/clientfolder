import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, Typography, Button, Box, TextField,InputAdornment } from "@mui/material";
import ProfileBar from "./ProfileBar";
import SearchIcon from "@mui/icons-material/Search"; 


const Profile = ({ setAuth }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [open, setOpen] = useState(false);


  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserInfo(response.data);
    } catch (err) {
      console.error(err.message);
      toast.error("فشل في جلب بيانات الملف الشخصي");
    }
  };

  const fetchMeetings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profile/user-meetings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMeetings(response.data);
      setSearchResults(response.data); // Initialize search results with all meetings
    } catch (err) {
      console.error(err.message);
      toast.error("فشل في جلب الاجتماعات");
    }
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResults(meetings);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/profile/search-meetings?query=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSearchResults(response.data);
    } catch (err) {
      console.error(err.message);
      toast.error("فشل في البحث عن الاجتماعات");
    }
  };

  const handleMeetingClick = async (meetingId) => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/user-meetings/${meetingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedMeeting(response.data);
      setOpen(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProfile();
    fetchMeetings();
  }, []);

  return (
    <div>
      <div className="mb-5 mt-20" style={{ direction: "rtl" }}>
        {userInfo ? (
          <ProfileBar />
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
     

    
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
          direction: "rtl", // Ensure proper alignment for RTL languages
        }}
      >
        <TextField
          value={searchQuery}
          onChange={handleSearch}
          placeholder="ابحث عن اجتماع"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            width: "60%", // Adjust the width to make it look more centered
            backgroundColor: "#fff",
            borderRadius: "25px", // Rounded edges
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a polished look
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px", // Ensures the input itself has rounded edges
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#999" }} /> {/* Adds a search icon */}
              </InputAdornment>
            ),
            style: {
              padding: "10px", // Adds padding inside the input for better spacing
            },
          }}
        />
      </Box>
    
      <List sx={{ maxWidth: "80%", margin: "0 auto", direction: "rtl" }}>
        {searchResults.map((meeting) => {
          const meetingDate = new Date(meeting.start_at);
          const isPast = meetingDate < new Date();
          return (
            <ListItem
              key={meeting.meeting_id}
              className={`border my-1 cursor-pointer mb-2 ${
                isPast ? "bg-gray-200 text-gray-500" : "bg-white"
              } hover:bg-gray-100`}
              sx={{
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                ...(isPast && { backgroundColor: "#e0e0e0", color: "#9e9e9e" }),
              }}
              onClick={() => handleMeetingClick(meeting.meeting_id)}
            >
              <ListItemText
                primary={meeting.title}
                primaryTypographyProps={{ sx: { textAlign: "right", } }}
                secondary={meetingDate.toLocaleDateString()}
                secondaryTypographyProps={{ sx: { textAlign: "left", color: isPast ? "#757575" : "inherit" } }}
              />
            </ListItem>
          );
        })}
      </List>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedMeeting?.title}</DialogTitle>
        <DialogContent>
          {selectedMeeting && (
            <>
              <Typography variant="body1">Date: {new Date(selectedMeeting.start_at).toLocaleDateString()}</Typography>
              <Typography variant="body1">Location: {selectedMeeting.place}</Typography>
              <Typography variant="body1">Subject: {selectedMeeting.subject}</Typography>
              <Typography variant="body1">Content: {selectedMeeting.content}</Typography>
              
              {selectedMeeting.meeting_pdf_exists && (
                <Box mt={2}>
                  <Typography variant="h6">Meeting PDF:</Typography>
                  <Typography>{selectedMeeting.meeting_pdf_name}</Typography>
                </Box>
              )}

              {selectedMeeting.attachments_exists && (
                <Box mt={2}>
                  <Typography variant="h6">Attachments:</Typography>
                  <Typography>{selectedMeeting.attachments_name}</Typography>
                </Box>
              )}

              {selectedMeeting.pv_exists && (
                <Box mt={2}>
                  <Typography variant="h6">PV (Rapport):</Typography>
                  <Typography>{selectedMeeting.pv_name}</Typography>
                </Box>
              )}

              {selectedMeeting.emails && selectedMeeting.emails.length > 0 && (
                <Box mt={2}>
                  <Typography variant="h6">Member Emails:</Typography>
                  <ul>
                    {selectedMeeting.emails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ul>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <Button onClick={handleClose} color="primary">Close</Button>
      </Dialog>
    </div>
  );
};

export default Profile;
