import React, { useEffect, useState } from 'react';
import {  Typography,  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import AdminNav from './AdminNav';
import axios from 'axios';

const AdminHistory = () => {
  const [history, setHistory] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  const fetchHistory = async (page) => {
    try {
      const response = await axios.get('http://localhost:5000/admin/history', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: {
          page: page,
          limit: rowsPerPage
        }
      });
      setHistory(response.data.entries);
      setTotalCount(parseInt(response.data.totalCount.rows[0].count));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div><div className='mr-[-120px]'>
           <AdminNav />  
        </div>
         <div style={{direction:"rtl"}}>
        
     
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          سجل الإدارة
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>رقم السجل</TableCell>
                <TableCell>رقم العضو</TableCell>
                <TableCell>الإجراء</TableCell>
                <TableCell>وقت الإجراء</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.journal_id}>
                  <TableCell>{entry.journal_id}</TableCell>
                  <TableCell>{entry.member_cin}</TableCell>
                  <TableCell>{entry.action}</TableCell>
                  <TableCell>{new Date(entry.action_time).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-center'>
            <TablePagination sx={{ marginTop: 4, direction:"ltr" }}
          rowsPerPageOptions={[10]}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          count={totalCount}
        />
        </div>
        
      </Container>
    </div> 
    </div>
  
  );
};

export default AdminHistory;
