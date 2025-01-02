'use client'

import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Typography,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams
} from '@mui/x-data-grid';
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [payslips, setPayslips] = useState<Payslip[]>([]);

  useEffect(() => {
    fetchPayslips();
  }, []);

  const fetchPayslips = async () => {
    try {
      const response = await fetch('/api/payslips');
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
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = `payslip-${payslipId}.pdf`;
        
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
          console.log('Filename match:', filenameMatch);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1];
          }
        }

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
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
  const columns: GridColDef[] = [
    { 
      field: 'payPeriod', 
      headerName: 'Pay Period', 
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>
          {new Date(params.row.payPeriod).toLocaleDateString('en-SG', { year: 'numeric', month: 'short' })}
        </Typography>
      )
    },
    { 
      field: 'basicSalary', 
      headerName: 'Basic Salary', 
      width: 100, 
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{formatCurrency(params.row.basicSalary)}</Typography>
      )
    },
    {
      field: 'overtime',
      headerName: 'Overtime',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{formatCurrency(params.row.overtime)}</Typography>
      )
    },
    { 
      field: 'allowances', 
      headerName: 'Allowances', 
      width: 100, 
      renderCell: (params: GridRenderCellParams) => (
        <Typography>
          {formatCurrency(Object.values(params.row.allowances as Record<string, number>).reduce((a, b) => a + b, 0))}
        </Typography>
      )
    },
    { 
      field: 'deductions', 
      headerName: 'Deductions', 
      width: 100, 
      renderCell: (params: GridRenderCellParams) => (
        <Typography>
          {formatCurrency(Object.values(params.row.deductions as Record<string, number>).reduce((a, b) => a + b, 0))}
        </Typography>
      )
    },
    {
      field: 'cpfEmployeeContrib',
      headerName: 'CPF (Employee)',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{formatCurrency(params.row.cpfEmployeeContrib)}</Typography>
      )
    },
    {
      field: 'cpfEmployerContrib',
      headerName: 'CPF (Employer)',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{formatCurrency(params.row.cpfEmployerContrib)}</Typography>
      )
    },
    {
      field: 'grossSalary',
      headerName: 'Gross Salary',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{formatCurrency(params.row.grossSalary)}</Typography>
      )
    },
    {
      field: 'netSalary',
      headerName: 'Net Salary',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{formatCurrency(params.row.netSalary)}</Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Download Payslip">
          <IconButton onClick={() => handleDownload(params.row.id)}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const filterPayslips = () => {
    if (!selectedDate) return payslips;
    
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    return payslips.filter(payslip => {
      const payslipDate = new Date(payslip.payPeriod);
      return payslipDate.getFullYear() === year && payslipDate.getMonth() === month;
    });
  };

  const filteredPayslips = filterPayslips();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReceiptIcon fontSize="large" />
          Payslip Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <DatePicker
            views={['year', 'month']}
            label="Filter by Month"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
          <Button variant="contained" onClick={() => setSelectedDate(null)}>
            Clear Filter
          </Button>
        </Box>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredPayslips}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </Box>
    </LocalizationProvider>
  );
};

export default PayslipDashboard;

