import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { toast } from "react-toastify"; // Importing toast for notifications

function ProfileBar({ username }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigate("/update-password"); // Navigate to the UpdatePassword page
  };

  const handleMeetingsClick = () => {
    setAnchorEl(null);
    navigate("/"); // Navigate to the user's meetings page
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    toast.success("تم تسجيل الخروج بنجاح"); // Show a success notification

    // Redirect to login page
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <div className="mb-4">
      <AppBar sx={{ backgroundColor: "#1A4D2E" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, direction: "rtl" }}>
            {username} مرحبًا
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleMeetingsClick}>الاجتماعات</MenuItem>
              <MenuItem onClick={handleProfileClick}>تحديث كلمة المرور</MenuItem>
              <MenuItem onClick={handleLogout}>تسجيل الخروج</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ProfileBar;
