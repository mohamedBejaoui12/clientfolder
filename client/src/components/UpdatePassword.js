import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileBar from "./ProfileBar"; // Assuming ProfileBar is your ProfileNav component
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importing toast for notifications

function UpdatePassword() {
  const [userData, setUserData] = useState({
    member_cin: "",
    fullname: "",
    member_email: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profile/profile-data", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/profile/update-password", 
        { newPassword }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("تم تحديث كلمة المرور بنجاح"); // Show success toast
      navigate("/"); // Redirect to meetings page
    } catch (error) {
      console.error("Error updating password", error);
      toast.error("Error updating password"); // Show error toast if needed
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 20, direction: "rtl" }}>
      <ProfileBar />
      <Box
        sx={{
          backgroundColor: "#f7f7f7",
          p: 4,
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          direction: "rtl",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          تحديث كلمة المرور
        </Typography>
        <Typography variant="body1" gutterBottom>
          رقم الهوية: {userData.member_cin}
        </Typography>
        <Typography variant="body1" gutterBottom>
          الاسم: {userData.fullname}
        </Typography>
        <Typography variant="body1" gutterBottom>
          البريد الإلكتروني: {userData.member_email}
        </Typography>
        <form onSubmit={handlePasswordChange}>
          <TextField
            label="كلمة المرور الجديدة"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 3, mb: 2, textAlign: "right" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#0D3B3C",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#06595B",
              },
            }}
          >
            تحديث كلمة المرور
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default UpdatePassword;
