import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function AdminNav() {
  const [meetingAnchorEl, setMeetingAnchorEl] = useState(null);
  const [memberAnchorEl, setMemberAnchorEl] = useState(null);

  const handleMeetingClick = (event) => {
    setMeetingAnchorEl(event.currentTarget);
  };

  const handleMeetingClose = () => {
    setMeetingAnchorEl(null);
  };

  const handleMemberClick = (event) => {
    setMemberAnchorEl(event.currentTarget);
  };

  const handleMemberClose = () => {
    setMemberAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A4D2E', boxShadow: 3 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2, paddingLeft: "30px" }}>
          <Button
            color="inherit"
            startIcon={<ArrowDropDownIcon />}
            onClick={handleMeetingClick}
            sx={{ textTransform: 'none', fontSize: "16px", fontWeight: 'bold' }}
          >
            الاجتماعات
          </Button>
          <Menu
            anchorEl={meetingAnchorEl}
            open={Boolean(meetingAnchorEl)}
            onClose={handleMeetingClose}
          >
            <MenuItem onClick={handleMeetingClose} component={Link} to="/add-meeting">
              إضافة اجتماع
            </MenuItem>
            <MenuItem onClick={handleMeetingClose} component={Link} to="/allMeetings">
              جميع الاجتماعات
            </MenuItem>
          </Menu>

          <Button
            color="inherit"
            startIcon={<ArrowDropDownIcon />}
            onClick={handleMemberClick}
            sx={{ textTransform: 'none', fontSize: "16px", fontWeight: 'bold' }}
          >
            الأعضاء
          </Button>
          <Menu
            anchorEl={memberAnchorEl}
            open={Boolean(memberAnchorEl)}
            onClose={handleMemberClose}
          >
            <MenuItem onClick={handleMemberClose} component={Link} to="/add-member">
              إضافة عضو
            </MenuItem>
            <MenuItem onClick={handleMemberClose} component={Link} to="/all-members">
              جميع الأعضاء
            </MenuItem>
          </Menu>
 
          <Button
            color="inherit"
            component={Link}
            to="/admin/history"  
            sx={{ textTransform: 'none', fontSize: "16px", fontWeight: 'bold' }}
          >
            السجل
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/admin-dashboard"
            sx={{ textTransform: 'none', fontSize: "16px", fontWeight: 'bold',color:"#B6B679" }}
          >
            لوحة القيادة
          </Button>

         
        </Box>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'right', fontWeight: 'bold', paddingRight: "140px" }}>
          لوحة الإدارة
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNav;
