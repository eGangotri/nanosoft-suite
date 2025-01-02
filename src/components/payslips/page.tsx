'use client'

import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DownloadIcon from '@mui/icons-material/Download';

interface Payslip {
  id: number;
  payPeriod: string;
  basicSalary: number;
  overtime: number;
  allowances: { [key: string]: number };
  deductions: { [key: string]: number };
  cpfEmployeeContrib: number;
  cpfEmployerContrib: number;
  grossSalary: number;
  netSalary: number;
}

const PayslipDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [payslips, setPayslips] = useState<Payslip[]>([]);

  useEffect(() => {
    fetchPayslips();
  }, [selectedDate]);

  const fetchPayslips = async () => {
    if (!selectedDate) return;

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;

    try {
      const response = await fetch(`/api/payslips?year=${year}&month=${month}`);
      if (response.ok) {
        const data = await response.json();
        setPayslips(data);
      } else {
        console.error('Failed to fetch payslips');
      }
    } catch (error) {
      console.error('Error fetching payslips:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(amount);
  };

  const handleDownload = async (payslipId: number) => {
    try {
      console.log('Downloading payslip:', payslipId);
      const response = await fetch(`/api/payslips/${payslipId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `payslip-${payslipId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to download payslip');
      }
    } catch (error) {
      console.error('Error downloading payslip:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{  padding: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReceiptIcon fontSize="large" />
          Payslip Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <DatePicker
            views={['year', 'month']}
            label="Select Month"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
          <Button variant="contained" onClick={fetchPayslips}>
            Search
          </Button>
        </Box>
        {payslips.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pay Period</TableCell>
                  <TableCell align="right">Basic Salary</TableCell>
                  <TableCell align="right">Overtime</TableCell>
                  <TableCell align="right">Allowances</TableCell>
                  <TableCell align="right">Deductions</TableCell>
                  <TableCell align="right">CPF (Employee)</TableCell>
                  <TableCell align="right">CPF (Employer)</TableCell>
                  <TableCell align="right">Gross Salary</TableCell>
                  <TableCell align="right">Net Salary</TableCell>
                  <TableCell align="center">Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payslips.map((payslip) => (
                  <TableRow key={payslip.id}>
                    <TableCell component="th" scope="row">
                      {new Date(payslip.payPeriod).toLocaleDateString('en-SG', { year: 'numeric', month: 'long' })}
                    </TableCell>
                    <TableCell align="right">{formatCurrency(payslip.basicSalary)}</TableCell>
                    <TableCell align="right">{formatCurrency(payslip.overtime)}</TableCell>
                    <TableCell align="right">{formatCurrency(Object.values(payslip.allowances).reduce((a, b) => a + b, 0))}</TableCell>
                    <TableCell align="right">{formatCurrency(Object.values(payslip.deductions).reduce((a, b) => a + b, 0))}</TableCell>
                    <TableCell align="right">{formatCurrency(payslip.cpfEmployeeContrib)}</TableCell>
                    <TableCell align="right">{formatCurrency(payslip.cpfEmployerContrib)}</TableCell>
                    <TableCell align="right">{formatCurrency(payslip.grossSalary)}</TableCell>
                    <TableCell align="right">{formatCurrency(payslip.netSalary)}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Download Payslip">
                        <IconButton onClick={() => handleDownload(payslip.id)}>
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No payslips found for the selected month.</Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default PayslipDashboard;

